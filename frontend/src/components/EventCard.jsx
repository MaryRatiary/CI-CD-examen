import React from 'react';

const EventCard = ({ event, onBuyTickets }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <p className="text-gray-600 mt-2">{event.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-500">{event.location}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-600">{event.price}€</p>
            <p className="text-sm text-gray-500">
              {event.availableTickets} places restantes
            </p>
          </div>
        </div>
        <button
          onClick={() => onBuyTickets(event)}
          disabled={event.availableTickets === 0}
          className={`mt-4 w-full py-2 px-4 rounded-md ${
            event.availableTickets > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
        >
          {event.availableTickets > 0 ? 'Acheter des billets' : 'Complet'}
        </button>
      </div>
    </div>
  );
}

export default EventCard;
