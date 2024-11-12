import express from 'express';
import {
    handleEmailSignup,
    handleEmailSignin,
    handleGoogleAuth,
    handleGoogleRedirect,
    handleLogout
} from '../controller/authController.js';

const router = express.Router();

router.route('/signup/email').post(handleEmailSignup);
router.route('/signin/email').post(handleEmailSignin);

router.route('/google').get(handleGoogleAuth);

router.route('/').get(handleGoogleRedirect);

router.route('/logout').get(handleLogout);

export default router;