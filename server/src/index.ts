import express, { Request, Response , Application, NextFunction } from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import router from './routes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.use('/api', router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.delete('/delete', async (req: Request, res: Response) => {
  await prisma.user.deleteMany({});
  res.status(200).json({ message: 'Data deleted successfully' });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});