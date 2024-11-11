import express from 'express';
import {
    handleEmailSignup,
    handleEmailSignin
} from '../controller/authController';

const router = express.Router();

router.route('/signup/email').post(handleEmailSignup);

router.route('/signin/email').post(handleEmailSignin);

export default router;