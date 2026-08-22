import express, { Request, Response } from 'express';
import './config/database';
import apiRouter from './routes/api';

const app = express();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${PORT}`;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Octofit Tracker API listening at ${apiBaseUrl}`);
});
