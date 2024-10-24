import express from 'express';
import { handleNewUrl } from '../controller/url.js';

const router = express.Router();

router.route('/')
    .post(handleNewUrl);

export default router;