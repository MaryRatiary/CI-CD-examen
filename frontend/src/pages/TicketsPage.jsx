import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import TicketCard from '../components/TicketCard';

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour voir vos billets');
      }

      const response = await fetch('http://localhost:5000/api/tickets/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des billets');
      }

      const data = await response.json();
      setTickets(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
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
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
            <p className="text-center text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Mes Billets
          </h1>
          <p className="mt-2 text-gray-400">
            Retrouvez tous vos billets pour les événements à venir
          </p>
        </motion.div>

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Vous n'avez pas encore de billets</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2"
          >
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
