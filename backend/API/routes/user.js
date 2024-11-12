import express from 'express';
import {
    handleUserGet
} from '../controller/userController.js';

const router = express.Router();

router.route('/').get(handleUserGet);

export default router;