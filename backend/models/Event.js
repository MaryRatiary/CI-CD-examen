import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  totalTickets: { 
    type: Number, 
    required: true,
    min: 0 
  },
  availableTickets: { 
    type: Number, 
    required: true,
    min: 0 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Music', 'Technology', 'Art', 'Entertainment', 'Gaming', 'Fashion', 'Sport']
  },
  image: { 
    type: String, 
    default: 'default-event.jpg' 
  },
  imageAlt: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  theme: {
    type: String,
    enum: ['cyber', 'tech', 'bio', 'space', 'fashion', 'art', 'eco', 'meta'],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);
