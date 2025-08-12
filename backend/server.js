import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import Event from './models/Event.js';
import Ticket from './models/Ticket.js';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import ticketRoutes from './routes/tickets.js';
import eventRoutes from './routes/events.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/events', eventRoutes);

// Connexion MongoDB avec retry
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongo:27017/billetterie', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

/* ================================
   ROUTES UTILISATEURS
================================ */
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const userResponse = { ...newUser._doc };
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================================
   ROUTES EVENEMENTS
================================ */
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    event.availableTickets = event.totalTickets;
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================================
   ROUTES TICKETS
================================ */
app.post('/api/tickets', async (req, res) => {
  try {
    const { eventId, userId, quantity } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    if (event.availableTickets < quantity) {
      return res.status(400).json({ message: 'Pas assez de tickets disponibles' });
    }

    const ticket = new Ticket({
      eventId,
      userId,
      quantity,
      totalPrice: event.price * quantity,
      status: 'reserved',
    });

    event.availableTickets -= quantity;

    await Promise.all([ticket.save(), event.save()]);

    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/tickets/user/:userId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.params.userId })
      .populate('eventId')
      .sort({ purchaseDate: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/tickets/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket non trouvé' });
    }
    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================================
   DEMARRAGE DU SERVEUR
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});