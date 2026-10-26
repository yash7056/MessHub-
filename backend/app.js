import express from 'express';
import { connectDB } from '../database/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import messRoutes from './routes/messes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure MongoDB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection error in request handler:', err);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

// Routes (mounted at both /api/... and /... for maximum hosting compatibility)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/messes', messRoutes);
app.use('/messes', messRoutes);

// Health Check
app.get(['/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', message: 'MessHub Backend API is running' });
});

export default app;
