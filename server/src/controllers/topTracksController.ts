import { Request, Response } from 'express';
import { access_token } from './authController';
import { getUser } from '../model/User';
import { createTopTracks, getTopTracksData, checkTopTracks } from '../model/TopTracks';

interface Track {
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

const getTopTracks = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const timeRange = req.query.timeRange as TimeRange || 'short_term';
  try {
    const spotifyResponseJson = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=30`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const spotifyResponse = await spotifyResponseJson.json();
    const spotifyTopTracks = spotifyResponse.items as Track[];

    const user = await getUser(userId);
    const recentTopTracksData = await getTopTracksData(user, timeRange);

    const comparedTracks = spotifyTopTracks.map((spotifyTrack: Track, index) => {
      const indexOfRecentTrack = recentTopTracksData?.indexOf(spotifyTrack.id);
      if (indexOfRecentTrack === -1 || recentTopTracksData?.length === 0) {
        return { change: 'new', ...spotifyTrack };
      } else if (index === indexOfRecentTrack ) {
        return { change: 'equal', ...spotifyTrack };
      } else if (index < indexOfRecentTrack) {
        return { change: 'up', ...spotifyTrack };
      } else {
        return { change: 'down', ...spotifyTrack };
      }
    });

    res.status(200).json(comparedTracks);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Failed to fetch and compare top tracks' });
  }
};

const postTopTracks = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { timeRange, tracks } = req.body;
    const user = await getUser(userId);
    const isTopTracksExist = await checkTopTracks(user, timeRange);
    if (isTopTracksExist) {
      res.status(400).json({ error: 'Top tracks already exist' });
    } else {
      const createdTopTracks = await createTopTracks(user, timeRange, tracks);
      res.status(201).json(createdTopTracks);
    }
  } catch (error) {
    console.error('Error creating top tracks:', error);
    res.status(500).json({ error: 'Failed to create top tracks' });
  }
};

export { getTopTracks, postTopTracks };