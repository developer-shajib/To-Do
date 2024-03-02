import express from 'express';
import { login, logout, me, register } from '../controllers/authController.js';
import tokenVerify from '../middlewares/tokenVerify.js';

const router = express.Router();

// create route
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/me').get(tokenVerify, me);

// export default router
export default router;
