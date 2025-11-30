import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database';

export const getRecipes = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM recipes WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createRecipeValidation = [
  body('title').trim().notEmpty(),
  body('ingredients').isArray(),
  body('instructions').optional().trim(),
  body('total_price').optional().isFloat({ min: 0 }),
];

export const createRecipe = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { title, ingredients, instructions, total_price } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO recipes (user_id, title, ingredients, instructions, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, title, JSON.stringify(ingredients), instructions || null, total_price || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { title, ingredients, instructions, total_price } = req.body;

  try {
    const result = await pool.query(
      'UPDATE recipes SET title = COALESCE($1, title), ingredients = COALESCE($2, ingredients), instructions = COALESCE($3, instructions), total_price = COALESCE($4, total_price), updated_at = NOW() WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, ingredients ? JSON.stringify(ingredients) : null, instructions, total_price, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
