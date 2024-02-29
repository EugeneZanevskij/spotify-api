import express from 'express';
import { getTopTracks, postTopTracks } from '../controllers/topTracksController';

const router = express.Router();

router.get('/:userId', getTopTracks);

router.post('/:userId', postTopTracks);

export default router;