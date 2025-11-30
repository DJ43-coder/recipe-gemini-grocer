import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import {
  hashToken,
  storeRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
  deleteAllUserRefreshTokens,
  blacklistJTI,
  storeSession,
  deleteSession,
} from '../services/sessionService';

const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60; // 7 days in seconds

export const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
];

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, created_at',
      [email, hashedPassword, firstName || null, lastName || null]
    );

    const user = result.rows[0];

    // Assign default 'user' role
    await pool.query('INSERT INTO user_roles (user_id, role) VALUES ($1, $2)', [user.id, 'user']);

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: 'user' });
    const { token: refreshToken, jti } = generateRefreshToken({ userId: user.id, email: user.email, role: 'user' });

    const hashedRefreshToken = hashToken(refreshToken);
    await storeRefreshToken(user.id, jti, hashedRefreshToken, REFRESH_TOKEN_EXPIRY);
    await storeSession(user.id, { email: user.email, loginTime: new Date().toISOString() }, REFRESH_TOKEN_EXPIRY);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRY * 1000,
      domain: process.env.COOKIE_DOMAIN,
    });

    res.status(201).json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: 'user',
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT u.id, u.email, u.password_hash, u.first_name, u.last_name, ur.role FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id WHERE u.email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const role = user.role || 'user';
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role });
    const { token: refreshToken, jti } = generateRefreshToken({ userId: user.id, email: user.email, role });

    const hashedRefreshToken = hashToken(refreshToken);
    await storeRefreshToken(user.id, jti, hashedRefreshToken, REFRESH_TOKEN_EXPIRY);
    await storeSession(user.id, { email: user.email, loginTime: new Date().toISOString() }, REFRESH_TOKEN_EXPIRY);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRY * 1000,
      domain: process.env.COOKIE_DOMAIN,
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    if (!payload.jti) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const storedHash = await getRefreshToken(payload.userId, payload.jti);
    const providedHash = hashToken(refreshToken);

    if (!storedHash || storedHash !== providedHash) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Rotate refresh token
    await deleteRefreshToken(payload.userId, payload.jti);
    await blacklistJTI(payload.jti, REFRESH_TOKEN_EXPIRY);

    const accessToken = generateAccessToken({ userId: payload.userId, email: payload.email, role: payload.role });
    const { token: newRefreshToken, jti: newJti } = generateRefreshToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    const newHashedToken = hashToken(newRefreshToken);
    await storeRefreshToken(payload.userId, newJti, newHashedToken, REFRESH_TOKEN_EXPIRY);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRY * 1000,
      domain: process.env.COOKIE_DOMAIN,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      if (payload.jti) {
        await deleteRefreshToken(payload.userId, payload.jti);
        await blacklistJTI(payload.jti, REFRESH_TOKEN_EXPIRY);
      }
      await deleteSession(payload.userId);
    } catch (error) {
      // Token might be invalid, but we still clear the cookie
      console.error('Logout error:', error);
    }
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    domain: process.env.COOKIE_DOMAIN,
  });

  res.status(204).send();
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const result = await pool.query(
      'SELECT u.id, u.email, u.first_name, u.last_name, ur.role FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id WHERE u.id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role || 'user',
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
