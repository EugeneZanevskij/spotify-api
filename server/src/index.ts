import express, { Express, Request, Response , Application } from 'express';
import * as dotenv from "dotenv";
import cors from "cors";

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

const client_id = process.env.CLIENT_ID as string;
const redirect_uri = process.env.REDIRECT_URI as string;
const client_secret = process.env.CLIENT_SECRET as string;
const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-top-read';
  const params = {
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state
  }
  const URLParams = new URLSearchParams(params);
  res.redirect('https://accounts.spotify.com/authorize?' +
    URLParams.toString());
});

app.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    const params = {
      error: 'state_mismatch'
    }
    const URLParams = new URLSearchParams(params);
    res.redirect('/#' +
      URLParams.toString());
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
  }
});

app.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`);
});