import { NextFunction, Request, Response } from 'express';
import querystring from "querystring";
import { createOrSkipUser } from '../model/User';

export let access_token: string | null = null;
export let expires_in: number | null = null;
export let refresh_token: string | null = null;

const refreshAccessToken = async () => {
  if (!refresh_token) {
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

const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!access_token || !expires_in || Date.now() >= expires_in) {
    await refreshAccessToken();
  }
  next();
};

const login = async (req: Request, res: Response) => {
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
};

const callback = async (req: Request, res: Response) => {
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
    res.status(500).json({ error: 'Failed to retrieve access token' });
  }
};

const getTokenId = async (req: Request, res: Response) => {
  const profileResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const json = await profileResponse.json();
  const email = json.email as string;

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
}

const logout = (req: Request, res: Response) => {
  if (access_token) {
    access_token = null;
    expires_in = null;
    refresh_token = null;
    res.status(200).json({ result: "SUCCESS", message: 'Logged out successfully' });
  } else {
    res.status(401).json({ result: "ERROR", message: 'Access token not available' });
  }
};

export { checkAccessToken, login, callback, getTokenId, logout };