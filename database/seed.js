import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Mess from './models/Mess.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

// We only seed default customer accounts so they can log in immediately
// to see the empty list of messes without having to register a student first.
// Sellers and messes will start completely empty for real-time creation.
const customersData = [
  {
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    password: 'password123',
    mobile: '+91 91234 56789',
    role: 'customer',
  },
  {
    name: 'Rahul Mehta',
    email: 'rahul@gmail.com',
    password: 'password123',
    mobile: '+91 92345 67890',
    role: 'customer',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/messhub');
    console.log('Seed: Connected to MongoDB.');

    // Clear existing data
    await User.deleteMany({});
    await Mess.deleteMany({});
    console.log('Seed: Cleared existing users and messes.');

    // Create customer users
    for (const customerData of customersData) {
      const user = new User(customerData);
      await user.save();
      console.log(`Seed: Created customer account ${user.name} (${user.email})`);
    }

    console.log('Database successfully initialized (0 messes installed, clean for real-time signups).');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
