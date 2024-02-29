import express from 'express';
import { getTopTracks, postTopTracks } from '../controllers/topTracksController';

const router = express.Router();

router.get('/:timeRange', getTopTracks);

router.post('/:timeRange', postTopTracks);

export default router;