import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TicketCard = ({ ticket }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    initial: {
      boxShadow: "0 0 0px rgba(0, 191, 255, 0)",
    },
    animate: {
      boxShadow: "0 0 30px rgba(0, 191, 255, 0.3)",
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 backdrop-blur-lg"
    >
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 pointer-events-none"
      />
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            {ticket.eventId?.title}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-300">{ticket.eventId ? new Date(ticket.eventId.date).toLocaleDateString() : 'Date non disponible'}</span>
            </div>

            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-300">{ticket.eventId?.location || 'Lieu non disponible'}</span>
            </div>

            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span className="font-mono text-cyan-400">#{ticket.ticketCode}</span>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 text-xs font-medium">
            Billet validé ✓
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-white p-2 rounded-lg">
            <QRCodeSVG
              value={`ticket-${ticket.ticketCode}`}
              size={120}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
    </motion.div>
  );
};

export default TicketCard;
