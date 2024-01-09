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

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`);
});