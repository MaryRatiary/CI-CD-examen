import React, { useState } from 'react';

const TicketModal = ({ event, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(quantity);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
        <div className="mb-4">
          <p className="text-gray-600">Prix unitaire: {event.price}€</p>
          <p className="text-gray-600">Places disponibles: {event.availableTickets}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre de billets:</label>
            <input
              type="number"
              min="1"
              max={event.availableTickets}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <p className="text-lg font-bold">
              Total: {(event.price * quantity).toFixed(2)}€
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Confirmer l'achat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
