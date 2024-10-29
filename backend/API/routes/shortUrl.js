import express from 'express';
import { handleNewUrl, handleGetUrl, handleGetClick } from '../controller/url.js';

const router = express.Router();

router.route('/')
    .post(handleNewUrl);

router.route('/:code')
    .get(handleGetUrl);

router.route('/:code/click')
    .get(handleGetClick)

export default router;