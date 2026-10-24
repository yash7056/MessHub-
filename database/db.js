import mongoose from 'mongoose';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });
import dns from 'dns';

// Ensure SRV records for Atlas resolve even if local ISP DNS fails
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not supported
}

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/messhub';
    await mongoose.connect(connStr);
    console.log('Connected to MongoDB database successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

export default mongoose;
