import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running' });
});

router.post('/test-post', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'POST route works' });
});

export default router;