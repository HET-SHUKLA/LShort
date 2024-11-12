import express from 'express';
import {
    handleUserGet,
    handleGetUrls
} from '../controller/userController.js';

const router = express.Router();

router.route('/').get(handleUserGet);
router.route('/urls').get(handleGetUrls);

export default router;