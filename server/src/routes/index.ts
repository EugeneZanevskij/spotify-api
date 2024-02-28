import express from 'express';
// import authRoutes from './authRoutes.ts';
import topTracksRoutes from './topTracksRoutes';

const router = express.Router();

// router.use('/auth', authRoutes);
router.use('/top-tracks', topTracksRoutes);

export default router;