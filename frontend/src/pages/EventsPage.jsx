import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleBuyTickets = async (event) => {
    try {
      setSelectedEvent(event);
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/tickets/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventId: event._id })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'achat du billet');
      }

      const ticket = await response.json();
      console.log('Billet acheté avec succès:', ticket);
      
      // Mettre à jour le nombre de billets disponibles dans l'interface
      setEvents(events.map(e => 
        e._id === event._id 
          ? { ...e, availableTickets: e.availableTickets - 1 }
          : e
      ));

      // Afficher une notification de succès
      alert('Billet acheté avec succès ! Consultez "Mes Billets" pour voir votre billet.');
    } catch (error) {
      console.error('Erreur lors de l\'achat:', error);
      alert(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('🔍 Fetching events...');
      const response = await fetch('http://localhost:5000/api/events');
      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📦 Received events:', data);
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching events:', error);
      setLoading(false);
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category.toLowerCase() === filter);

  const categories = ['all', ...new Set(events.map(event => event.category.toLowerCase()))];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-0 px-0 sm:px-0 lg:px-0">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 space-y-4"
      >
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Événements du Futur
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Découvrez des expériences uniques qui repoussent les limites de l'imagination
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              filter === category
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{
              rotate: 360,
              borderRadius: ["25%", "25%", "50%", "50%", "25%"]
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity
            }}
            className="w-16 h-16 border-4 border-cyan-400 border-t-transparent"
          />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event) => (
            <EventCard 
              key={event._id} 
              event={event}
              onBuyTickets={handleBuyTickets}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default EventsPage;
