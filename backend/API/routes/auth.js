import express from 'express';
import { handleEmailSignup } from '../controller/authController';

const router = express.Router();

router.route('/signup/email').post(handleEmailSignup);

export default router;