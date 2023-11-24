import express from 'express';
import { register, login } from '../controllers/authController';
import { getUserById } from '../controllers/userController';
import { checkToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:id', checkToken, getUserById)

export default router;
