import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();
const SECRET_KEY = 'votre_clé_secrète_jwt';

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null,
          name: !name ? 'Name is required' : null
        }
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favoriteEvents')
      .populate({
        path: 'purchaseHistory',
        populate: {
          path: 'eventId'
        }
      });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'profileImage'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ 
        message: 'Invalid updates', 
        details: `Allowed updates are: ${allowedUpdates.join(', ')}`
      });
    }

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates' });
  }

  updates.forEach(update => req.user[update] = req.body[update]);
  await req.user.save();
  res.json(req.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add event to favorites
router.post('/favorites/:eventId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.favoriteEvents.includes(req.params.eventId)) {
      user.favoriteEvents.push(req.params.eventId);
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove event from favorites
router.delete('/favorites/:eventId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favoriteEvents = user.favoriteEvents.filter(
      eventId => eventId.toString() !== req.params.eventId
    );
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin only: Get all users
router.get('/admin/users', auth, checkRole(['admin']), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
