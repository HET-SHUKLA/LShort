import express from 'express';
import { handleNewUrl, handleRedirectUrl, handleGetClick, handleAnalyticUrl } from '../controller/url.js';

const router = express.Router();

router.route('/')
    .post(handleNewUrl);

router.route('/:code')
    .get(handleRedirectUrl);

router.route('/:code/click')
    .get(handleGetClick)

router.route('/analytics/:code')
    .get(handleAnalyticUrl);

export default router;