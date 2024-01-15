import express, { Express, Request, Response , Application, NextFunction } from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import querystring from "querystring";

dotenv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

let access_token: string | null = null;
let expires_in: number | null = null;
let refresh_token: string | null = null;

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
    user-library-modify
    user-library-read
    user-top-read
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

app.get('/token', checkAccessToken, (req, res) => {
  res.json(
    {
      access_token
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});