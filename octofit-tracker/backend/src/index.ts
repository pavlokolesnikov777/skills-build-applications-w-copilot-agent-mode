import express, { Request, Response } from 'express';
import './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Octofit Tracker API listening on port ${PORT}`);
});
