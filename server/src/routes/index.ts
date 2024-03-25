import express from 'express';
import authRoutes from './authRoutes';
import topTracksRoutes from './topTracksRoutes';
import topArtistsRoutes from './topArtistsRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/top-tracks', topTracksRoutes);
router.use('/top-artists', topArtistsRoutes);

export default router;