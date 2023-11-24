import express from 'express';
import { login } from '../controllers/login/authLoginController';
import { register } from '../controllers/register/authRegisterController';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
