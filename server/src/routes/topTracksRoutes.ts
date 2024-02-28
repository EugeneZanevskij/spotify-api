import express from 'express';
import { getLongTermTopTracks, getMediumTermTopTracks, getShortTermTopTracks, postLongTermTopTracks, postMediumTermTopTracks, postShortTermTopTracks } from '../controllers/topTracksController';
import { getUser } from '../model/User';

const router = express.Router();

router.get('/short-term', getShortTermTopTracks);

router.post('/short-term', postShortTermTopTracks);

router.get('/medium-term', getMediumTermTopTracks);

router.post('/medium-term', postMediumTermTopTracks);

router.get('/long-term', getLongTermTopTracks);

router.post('/long-term', postLongTermTopTracks);

export default router;