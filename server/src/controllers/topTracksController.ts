import { Request, Response } from 'express';
import { access_token } from './authController';
import { getUser } from '../model/User';
import { createTopTracks, getTopTracksData } from '../model/TopTracks';

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
  const { userId } = req.body;
  const timeRange = req.params.timeRange as TimeRange;
  try {
    const spotifyResponseJson = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=20`, {
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
    console.error('Error fetching and comparing top tracks:', error);
    res.status(500).json({ error: 'Failed to fetch and compare top tracks' });
  }
};

const postTopTracks = async (req: Request, res: Response) => {
  try {
    const { userId, tracks } = req.body;
    const timeRange = req.params.timeRange as TimeRange;
    const user = await getUser(userId);

    const createdTopTracks = await createTopTracks(user, timeRange, tracks);

    res.status(201).json(createdTopTracks);
  } catch (error) {
    console.error('Error creating top tracks:', error);
    res.status(500).json({ error: 'Failed to create top tracks' });
  }
};

export { getTopTracks, postTopTracks };