import express, { Express, Request, Response , Application, NextFunction } from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import querystring from "querystring";
import { Prisma, PrismaClient } from '@prisma/client';

dotenv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

let access_token: string | null = null;
let expires_in: number | null = null;
let refresh_token: string | null = null;

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

const refreshAccessToken = async () => {
  if (!refresh_token) {
    console.error('Refresh token is not available');
    return;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      access_token = data.access_token;
      expires_in = Date.now() + data.expires_in * 1000;
    } else {
      throw new Error('Failed to refresh access token');
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
};

// setInterval(refreshAccessToken, 3600000);

const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!access_token || !expires_in || Date.now() >= expires_in) {
    await refreshAccessToken();
  }

  console.log(access_token, expires_in, Date.now());
  next();
};

app.get('/login', (req, res) => {
  const scope =
    `user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    user-read-recently-played
    user-library-modify
    user-library-read
    user-top-read
    user-read-private
    user-read-email
    playlist-read-private
    playlist-modify-public`;

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI
    })
  );
});

app.get('/callback', async function (req, res) {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', req.query.code as string);
  params.append('redirect_uri', process.env.REDIRECT_URI as string);
  params.append('client_id', process.env.CLIENT_ID as string);
  params.append('client_secret', process.env.CLIENT_SECRET as string);

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: params.toString(),
    });

    if (response.ok) {
      const data = await response.json();
      access_token = data.access_token;
      expires_in = Date.now() + data.expires_in * 1000;
      refresh_token = data.refresh_token;

      res.redirect(process.env.CLIENT_REDIRECTURI as string);
    } else {
      throw new Error('Failed to retrieve access token');
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
    res.status(500).json({ error: 'Failed to retrieve access token' });
  }
});

app.get('/token', checkAccessToken, async (req, res) => {
  const profileResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const json = await profileResponse.json();
  const email = json.email as string;

  async function createOrSkipUser(email : string) {
    try{ 
    const user = await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email,
        topTracks: {
          create: {}
        }
      }
    });
    return user;
    }
    catch (error) {
      console.log(error);
    }
  }
  const user = await createOrSkipUser(email);
  res.status(200).json(
    {
      data: {
        id: user?.id || 0,
        access_token
      },
      message: 'ID and access_token retrieved successfully'
    }
  );
});

app.get('/logout', (req, res) => {
  if (access_token) {
    access_token = null;
    expires_in = null;
    refresh_token = null;
    res.status(200).json({ result: "SUCCESS", message: 'Logged out successfully' });
  } else {
    res.status(401).json({ result: "ERROR", message: 'Access token not available' });
  }
});

app.get('/top-tracks/short-term', async (req: Request, res: Response) => {
  const { userId } = req.body;
  // const userId = 5;
  try {
    // Fetch top tracks from Spotify API
    const spotifyResponseJson = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const spotifyResponse = await spotifyResponseJson.json();
    const spotifyTopTracks = spotifyResponse.items as Track[];

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { topTracks: true },
    });
    
    const recentTopTracks = await prisma.shortTermTracks.findMany({
      where: {
        topTracksId: user?.topTracks?.id
      },
      orderBy: {
        id: 'desc'
      },
      take: 1
    });
    const recentTopTracksData = recentTopTracks[0].trackData as string[];

    const comparedTracks = spotifyTopTracks.map((spotifyTrack: Track, index) => {
      const indexOfRecentTrack = recentTopTracksData?.indexOf(spotifyTrack.id);
      if (indexOfRecentTrack === -1) {
        return { change: 'new' };
      } else if (index === indexOfRecentTrack ) {
        return { change: 'equal' };
      } else if (index < indexOfRecentTrack) {
        return { change: 'up' };
      } else {
        return { change: 'down' };
      }
    });

    res.status(200).json(comparedTracks);
  } catch (error) {
    console.error('Error fetching and comparing top tracks:', error);
    res.status(500).json({ error: 'Failed to fetch and compare top tracks' });
  }
});

app.post('/top-tracks/short-term', async (req: Request, res: Response) => {
  try {
    // const { userId, tracks } = req.body;
    const userId = 5;
    const tracks = [
      '71BqAINEnezjQfxE4VuJfq',
      '3CWq0pAKKTWb0K4yiglDc4',
      '1Iq8oo9XkmmvCQiGOfORiz',
      '7dJYggqjKo71KI9sLzqCs8',
      '5KD6AEm19QnMbfWpfoOHMl',
      '3UaaBFWIxrwDRc6pSisyuH',
      '47oXF9VHCqabVcjd2gZBpa',
      '4NioO5R9sHEZh4cGzMHyNt',
      '6BuCMYELvszPH4LcD3LRGQ',
      '5hQSXkFgbxjZo9uCwd11so',
      '7bPWdJgx8vek7S5i5yAtvG',
      '21B45csd0sMwX5VnAHc4BX',
      '1xwAWUI6Dj0WGC3KiUPN0O',
      '79DPYZ6x8FfzgSgPoPhpC3',
      '5tyMJlMqaggzvuX7TtlrTe',
      '4VL310GGX3b2ixL3sV0Je8',
      '3MlEryrxCKZkcfX18ZLX96',
      '3rWDp9tBPQR9z6U5YyRSK4',
      '6T0sEnqjmHISIKwFETeeiP',
      '4R2kfaDFhslZEMJqAFNpdd'
    ] as Prisma.JsonArray;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { topTracks: true },
    });

    const createdTopTracks = await prisma.shortTermTracks.create({
      data: {
        topTracks: {
          // connect: { id: userId },
          connect: { id: user?.topTracks?.id },
        },
        trackData: tracks,
        date: '29.02.2024',
      },
    });

    res.status(201).json(createdTopTracks);
  } catch (error) {
    console.error('Error creating top tracks:', error);
    res.status(500).json({ error: 'Failed to create top tracks' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});