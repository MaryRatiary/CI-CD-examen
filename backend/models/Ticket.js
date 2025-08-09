import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['valid', 'used', 'cancelled'],
    default: 'valid'
  },
  ticketCode: {
    type: String,
    required: true,
    unique: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Générer un code de ticket unique avant la sauvegarde
ticketSchema.pre('save', function(next) {
  if (!this.ticketCode) {
    this.ticketCode = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
  }
  next();
});

export default mongoose.model('Ticket', ticketSchema);
