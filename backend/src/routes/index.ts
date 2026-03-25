import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import routeRoutes from './routes.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/routes', routeRoutes);

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running' });
});

export default router;