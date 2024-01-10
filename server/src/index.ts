import express, { Express, Request, Response , Application } from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import querystring from "querystring";

//For env File 
dotenv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

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

app.get('/callback', async function(req, res) {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', req.query.code as string);
  params.append('redirect_uri', process.env.REDIRECT_URI as string);
  params.append('client_id', process.env.CLIENT_ID as string);
  params.append('client_secret', process.env.CLIENT_SECRET as string);

  await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body: params.toString()
  })
  .then(response => response.json())
  .then(data => {
    const query = new URLSearchParams(data).toString();
    res.redirect(`${process.env.CLIENT_REDIRECTURI}?${query}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`);
});