import express from 'express';
import { getUserById } from '../controllers/userController';
import { checkToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:id', checkToken, getUserById);

export default router;
