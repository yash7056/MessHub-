import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env' });

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
