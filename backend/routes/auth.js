import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../database/models/User.js';
import Mess from '../../database/models/Mess.js';

const router = express.Router();

// Middleware to verify JWT token
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'messhub_jwt_secret_key_123');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, password, role, messName, messAddress } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Validate seller parameters
    if (role === 'seller') {
      if (!messName || !messName.trim()) {
        return res.status(400).json({ message: 'Mess/Restaurant name is required for sellers' });
      }
      if (!messAddress || !messAddress.trim()) {
        return res.status(400).json({ message: 'Mess address is required for sellers' });
      }
    }

    // Create user
    const user = new User({ name, email, mobile, password, role });
    await user.save();

    // If seller, create their custom mess record
    if (role === 'seller') {
      const defaultMess = new Mess({
        name: messName.trim(),
        owner: user._id,
        address: messAddress.trim(),
        phone: mobile || '+91 99999 99999',
        isOpen: true,
        rating: 5.0,
        reviewCount: 0,
        distance: parseFloat((Math.random() * 4 + 1).toFixed(1)), // random distance 1-5 km
        lunchPrice: 80,
        dinnerPrice: 90,
        isVeg: true,
        todaysMenu: {
          lunch: [],
          dinner: [],
        },
        coordinates: { lat: 12.9716, lng: 77.5946 },
        reviews: [],
      });
      await defaultMess.save();
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'messhub_jwt_secret_key_123', {
      expiresIn: '7d',
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify role matches
    if (user.role !== role) {
      return res.status(400).json({ message: `Account found but not as a ${role}` });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'messhub_jwt_secret_key_123', {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// Get Profile
router.get('/me', authenticate, async (req, res) => {
  res.json({ user: req.user });
});

export default router;
