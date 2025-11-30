import redisClient from '../config/redis';
import crypto from 'crypto';

const REFRESH_TOKEN_PREFIX = 'refresh:';
const SESSION_PREFIX = 'session:';
const JTI_BLACKLIST_PREFIX = 'blacklist:jti:';

export const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const storeRefreshToken = async (
  userId: string,
  jti: string,
  hashedToken: string,
  expirySeconds: number
): Promise<void> => {
  const key = `${REFRESH_TOKEN_PREFIX}${userId}:${jti}`;
  await redisClient.setEx(key, expirySeconds, hashedToken);
};

export const getRefreshToken = async (userId: string, jti: string): Promise<string | null> => {
  const key = `${REFRESH_TOKEN_PREFIX}${userId}:${jti}`;
  return await redisClient.get(key);
};

export const deleteRefreshToken = async (userId: string, jti: string): Promise<void> => {
  const key = `${REFRESH_TOKEN_PREFIX}${userId}:${jti}`;
  await redisClient.del(key);
};

export const deleteAllUserRefreshTokens = async (userId: string): Promise<void> => {
  const pattern = `${REFRESH_TOKEN_PREFIX}${userId}:*`;
  const keys = await redisClient.keys(pattern);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
};

export const blacklistJTI = async (jti: string, expirySeconds: number): Promise<void> => {
  const key = `${JTI_BLACKLIST_PREFIX}${jti}`;
  await redisClient.setEx(key, expirySeconds, '1');
};

export const isJTIBlacklisted = async (jti: string): Promise<boolean> => {
  const key = `${JTI_BLACKLIST_PREFIX}${jti}`;
  const result = await redisClient.get(key);
  return result !== null;
};

export const storeSession = async (
  userId: string,
  sessionData: any,
  expirySeconds: number
): Promise<void> => {
  const key = `${SESSION_PREFIX}${userId}`;
  await redisClient.setEx(key, expirySeconds, JSON.stringify(sessionData));
};

export const getSession = async (userId: string): Promise<any | null> => {
  const key = `${SESSION_PREFIX}${userId}`;
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const deleteSession = async (userId: string): Promise<void> => {
  const key = `${SESSION_PREFIX}${userId}`;
  await redisClient.del(key);
};
