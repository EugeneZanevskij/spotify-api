import express from 'express';
import { getTopArtists, postTopArtists } from '../controllers/topArtistsController';

const router = express.Router();

router.get('/:userId', getTopArtists);

router.post('/:userId', postTopArtists);

export default router;