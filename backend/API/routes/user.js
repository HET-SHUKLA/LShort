import express from 'express';
import {
    handleUserGet,
    handleGetUrls,
    handleDeleteUrl,
    handleResetUrl,
    handleShortEdit,
    handleLongEdit
} from '../controller/userController.js';

const router = express.Router();

router.route('/').get(handleUserGet);
router.route('/urls').get(handleGetUrls);
router.route('/urls/delete/:code').get(handleDeleteUrl);
router.route('/urls/reset/:code').get(handleResetUrl);
router.route('/urls/edit/short/:code').post(handleShortEdit);
router.route('/urls/edit/long/:code').post(handleLongEdit);

export default router;