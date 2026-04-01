import { Router } from 'express';
import {
  listRoutePoints,
  createRoutePoint,
  deleteRoutePoint,
} from '../controllers/routePoints.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', listRoutePoints);
router.post('/', authMiddleware, createRoutePoint);
router.delete('/:id', authMiddleware, deleteRoutePoint);

export default router;