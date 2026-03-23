import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running' });
});

router.get('/db-health', async (_req: Request, res: Response) => {
  const { error } = await supabase
    .from('routes')
    .select('*')
    .limit(1);

  if (error) {
    return res.status(500).json({
      message: 'Supabase connection failed',
      error: error.message,
    });
  }

  return res.status(200).json({
    message: 'Supabase connection successful',
  });
});

export default router;