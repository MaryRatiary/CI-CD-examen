import mongoose from 'mongoose';
import { seedEvents } from './seeds/events.js';
import Event from './models/Event.js';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/billetterie', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
    
    // Exécuter le seed des événements
    await seedEvents();
    
    // Fermer la connexion
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

connectDB();
