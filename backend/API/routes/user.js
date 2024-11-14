import express from 'express';
import {
    handleUserGet,
    handleGetUrls,
    handleDeleteUrl
} from '../controller/userController.js';

const router = express.Router();

router.route('/').get(handleUserGet);
router.route('/urls').get(handleGetUrls);
router.route('/urls/delete/:code').get(handleDeleteUrl);

export default router;