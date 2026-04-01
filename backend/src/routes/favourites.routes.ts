import { Router } from 'express';
import {
  listFavourites,
  addFavourite,
  removeFavourite,
} from '../controllers/favourites.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, listFavourites);
router.post('/', authMiddleware, addFavourite);
router.delete('/:routeId', authMiddleware, removeFavourite);

export default router;