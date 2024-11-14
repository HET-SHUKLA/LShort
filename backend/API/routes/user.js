import express from 'express';
import {
    handleUserGet,
    handleGetUrls,
    handleDeleteUrl,
    handleResetUrl
} from '../controller/userController.js';

const router = express.Router();

router.route('/').get(handleUserGet);
router.route('/urls').get(handleGetUrls);
router.route('/urls/delete/:code').get(handleDeleteUrl);
router.route('/urls/reset/:code').get(handleResetUrl);

export default router;