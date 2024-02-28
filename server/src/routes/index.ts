import express from 'express';
import authRoutes from './authRoutes';
import topTracksRoutes from './topTracksRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/top-tracks', topTracksRoutes);

export default router;