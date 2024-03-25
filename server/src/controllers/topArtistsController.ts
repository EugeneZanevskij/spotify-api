import { Request, Response } from 'express';
import { access_token } from './authController';
import { getUser } from '../model/User';
import { createTopArtists, getTopArtistsData, checkTopArtists } from '../model/TopArtists';

export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

const getTopArtists = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const timeRange = req.query.timeRange as TimeRange || 'short_term';
  try {
    const spotifyResponseJson = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=30`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const spotifyResponse = await spotifyResponseJson.json();
    const spotifyTopArtists = spotifyResponse.items as Artist[];

    const user = await getUser(userId);
    const recentTopArtistsData = await getTopArtistsData(user, timeRange);

    const comparedArtists = spotifyTopArtists.map((spotifyArtist: Artist, index) => {
      const indexOfRecentArtist = recentTopArtistsData?.indexOf(spotifyArtist.id);
      if (indexOfRecentArtist === -1 || recentTopArtistsData?.length === 0) {
        return { change: 'new', ...spotifyArtist };
      } else if (index === indexOfRecentArtist ) {
        return { change: 'equal', ...spotifyArtist };
      } else if (index < indexOfRecentArtist) {
        return { change: 'up', ...spotifyArtist };
      } else {
        return { change: 'down', ...spotifyArtist };
      }
    });

    res.status(200).json(comparedArtists);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Failed to fetch and compare top Artists' });
  }
};

const postTopArtists = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { timeRange, artists } = req.body;
    const user = await getUser(userId);
    const isTopArtistsExist = await checkTopArtists(user, timeRange);
    if (isTopArtistsExist) {
      res.status(400).json({ error: 'Top artists already exist' });
    } else {
      const createdTopArtists = await createTopArtists(user, timeRange, artists);
      res.status(201).json(createdTopArtists);
    }
  } catch (error) {
    console.error('Error creating top artists:', error);
    res.status(500).json({ error: 'Failed to create top artists' });
  }
};

export { getTopArtists, postTopArtists };