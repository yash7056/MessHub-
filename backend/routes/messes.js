import express from 'express';
import Mess from '../../database/models/Mess.js';
import { authenticate } from './auth.js';

const router = express.Router();

// Get all messes (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { search, maxDistance, minRating, maxPrice, onlyOpen, foodType } = req.query;

    const query = {};

    // Search filter (name or address)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
      ];
    }

    // Min Rating filter
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Open status filter
    if (onlyOpen === 'true') {
      query.isOpen = true;
    }

    // Food Type filter
    if (foodType === 'veg') {
      query.isVeg = true;
    } else if (foodType === 'non-veg') {
      query.isVeg = false;
    }

    // Fetch all matching messes
    let messes = await Mess.find(query).populate('owner', 'name email');

    // Filter by max distance (calculated statically or client-side, but let's do server-side filter here)
    if (maxDistance) {
      messes = messes.filter((mess) => mess.distance <= parseFloat(maxDistance));
    }

    // Filter by max price (checks minimum of lunch and dinner prices)
    if (maxPrice) {
      messes = messes.filter((mess) => {
        const minPrice = Math.min(mess.lunchPrice, mess.dinnerPrice);
        return minPrice <= parseInt(maxPrice);
      });
    }

    res.json(messes);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching messes', error: error.message });
  }
});

// Get seller's mess details
router.get('/seller/my-mess', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied. Sellers only.' });
    }

    const mess = await Mess.findOne({ owner: req.user._id });
    if (!mess) {
      return res.status(404).json({ message: 'Mess profile not found' });
    }

    res.json(mess);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching mess profile', error: error.message });
  }
});

// Update seller's mess details
router.put('/seller/my-mess', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied. Sellers only.' });
    }

    const { name, address, phone, isOpen, isVeg, lunchPrice, dinnerPrice, todaysMenu } = req.body;

    const mess = await Mess.findOne({ owner: req.user._id });
    if (!mess) {
      return res.status(404).json({ message: 'Mess profile not found' });
    }

    // Update fields if provided
    if (name !== undefined) mess.name = name;
    if (address !== undefined) mess.address = address;
    if (phone !== undefined) mess.phone = phone;
    if (isOpen !== undefined) mess.isOpen = isOpen;
    if (isVeg !== undefined) mess.isVeg = isVeg;
    if (lunchPrice !== undefined) mess.lunchPrice = lunchPrice;
    if (dinnerPrice !== undefined) mess.dinnerPrice = dinnerPrice;
    if (todaysMenu !== undefined) mess.todaysMenu = todaysMenu;

    await mess.save();
    res.json(mess);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating mess profile', error: error.message });
  }
});

// Add a review to a mess
router.post('/:id/reviews', authenticate, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const messId = req.params.id;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    const mess = await Mess.findById(messId);
    if (!mess) {
      return res.status(404).json({ message: 'Mess not found' });
    }

    // Create review
    const newReview = {
      customerName: req.user.name,
      rating: parseInt(rating),
      comment,
      date: new Date(),
    };

    mess.reviews.push(newReview);
    mess.reviewCount = mess.reviews.length;

    // Recalculate average rating
    const totalRating = mess.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    mess.rating = parseFloat((totalRating / mess.reviews.length).toFixed(1));

    await mess.save();
    res.status(201).json(mess);
  } catch (error) {
    res.status(500).json({ message: 'Server error adding review', error: error.message });
  }
});

export default router;
