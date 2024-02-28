import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { access_token } from './authController';
import { getUser } from '../model/User';
import { createLongTermTopTracks, createMediumTermTopTracks, createShortTermTopTracks, getLongTermTopTracksData, getMediumTermTopTracksData, getShortTermTopTracksData } from '../model/TopTracks';

const prisma = new PrismaClient();

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
}

const getShortTermTopTracks = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const spotifyResponseJson = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const spotifyResponse = await spotifyResponseJson.json();
    const spotifyTopTracks = spotifyResponse.items as Track[];

    const user = await getUser(userId);
    const recentTopTracksData = await getShortTermTopTracksData(user);

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

const postShortTermTopTracks = async (req: Request, res: Response) => {
  try {
    const { userId, tracks } = req.body;
    const user = await getUser(userId);

    const createdTopTracks = await createShortTermTopTracks(user, tracks);

    res.status(201).json(createdTopTracks);
  } catch (error) {
    console.error('Error creating top tracks:', error);
    res.status(500).json({ error: 'Failed to create top tracks' });
  }
};

const getMediumTermTopTracks = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const spotifyResponseJson = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=30', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const spotifyResponse = await spotifyResponseJson.json();
    const spotifyTopTracks = spotifyResponse.items as Track[];

    const user = await getUser(userId);
    const recentTopTracksData = await getMediumTermTopTracksData(user);

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

const postMediumTermTopTracks = async (req: Request, res: Response) => {
  try {
    const { userId, tracks } = req.body;
    const user = await getUser(userId);

    const createdTopTracks = await createMediumTermTopTracks(user, tracks);

    res.status(201).json(createdTopTracks);
  } catch (error) {
    console.error('Error creating top tracks:', error);
    res.status(500).json({ error: 'Failed to create top tracks' });
  }
};

const getLongTermTopTracks = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const spotifyResponseJson = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=30', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const spotifyResponse = await spotifyResponseJson.json();
    const spotifyTopTracks = spotifyResponse.items as Track[];

    const user = await getUser(userId);
    const recentTopTracksData = await getLongTermTopTracksData(user);

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

const postLongTermTopTracks = async (req: Request, res: Response) => {
  try {
    const { userId, tracks } = req.body;
    const user = await getUser(userId);

    const createdTopTracks = await createLongTermTopTracks(user, tracks);

    res.status(201).json(createdTopTracks);
  } catch (error) {
    console.error('Error creating top tracks:', error);
    res.status(500).json({ error: 'Failed to create top tracks' });
  }
};

export { getShortTermTopTracks, postShortTermTopTracks, getMediumTermTopTracks, postMediumTermTopTracks, getLongTermTopTracks, postLongTermTopTracks };