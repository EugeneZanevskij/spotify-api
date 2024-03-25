import express from 'express';
import { callback, checkAccessToken, getTokenId, login, logout } from '../controllers/authController';

const router = express.Router();

router.get('/login', login);

router.get('/callback', callback);

router.get('/token', checkAccessToken, getTokenId);

router.get('/logout', logout);

export default router;