import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import postsRouter from './routes/posts';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import contactRouter from './routes/contact';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/contact', contactRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(500).json({ error: 'Internal server error', detail: message });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
