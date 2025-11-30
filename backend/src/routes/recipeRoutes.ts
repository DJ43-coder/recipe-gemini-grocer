import { Router } from 'express';
import {
  getRecipes,
  createRecipe,
  createRecipeValidation,
  updateRecipe,
  deleteRecipe,
} from '../controllers/recipeController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getRecipes);
router.post('/', authenticate, createRecipeValidation, createRecipe);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

export default router;
