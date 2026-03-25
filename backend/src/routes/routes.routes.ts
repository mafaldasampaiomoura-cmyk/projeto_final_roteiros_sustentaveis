import { Router } from 'express';
import {
  listRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
} from '../controllers/routes.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', listRoutes);
router.get('/:id', getRouteById);
router.post('/', authMiddleware, createRoute);
router.put('/:id', authMiddleware, updateRoute);
router.delete('/:id', authMiddleware, deleteRoute);

export default router;