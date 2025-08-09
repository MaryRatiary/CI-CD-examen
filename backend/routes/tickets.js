import express from 'express';
import { auth } from '../middleware/auth.js';
import Ticket from '../models/Ticket.js';
import Event from '../models/Event.js';

const router = express.Router();

// Get user's tickets
router.get('/me', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id })
      .populate({
        path: 'eventId',
        select: 'title date location price image description'
      })
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific ticket
router.get('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('eventId');
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Purchase a ticket
router.post('/purchase', auth, async (req, res) => {
  try {
    const { eventId } = req.body;
    
    // Vérifier si l'événement existe
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    // Vérifier s'il reste des billets disponibles
    if (event.availableTickets <= 0) {
      return res.status(400).json({ message: 'Plus de billets disponibles' });
    }

    // Créer le billet
    const ticket = new Ticket({
      eventId: event._id,
      userId: req.user._id,
      ticketCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
      status: 'valid',
      purchaseDate: new Date()
    });

    // Sauvegarder le billet et mettre à jour le nombre de billets disponibles
    await ticket.save();
    event.availableTickets -= 1;
    await event.save();

    // Retourner le billet avec les informations de l'événement
    const populatedTicket = await Ticket.findById(ticket._id).populate('eventId');
    res.status(201).json(populatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
