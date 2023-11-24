import express from 'express';
import { checkToken } from '../middlewares/authMiddleware';
import { getUserById } from '../controllers/user/userController';

const router = express.Router();

router.get('/:id', checkToken, getUserById);

export default router;
