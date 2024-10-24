import express from 'express';
import { handleNewUrl, handleGetUrl } from '../controller/url.js';

const router = express.Router();

router.route('/')
    .post(handleNewUrl);

router.route('/:code')
    .get(handleGetUrl);

export default router;