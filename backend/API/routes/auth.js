import express from 'express';

const router = express.Router();

router.route('/signup/email').post(handleEmailSignup)

export default router;