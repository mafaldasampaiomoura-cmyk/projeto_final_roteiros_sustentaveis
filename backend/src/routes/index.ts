import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import routeRoutes from './routes.routes';
import routePointsRoutes from './routePoints.routes';
import favouritesRoutes from './favourites.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/routes', routeRoutes);
router.use('/route-points', routePointsRoutes);
router.use('/favourites', favouritesRoutes);

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running' });
});

export default router;