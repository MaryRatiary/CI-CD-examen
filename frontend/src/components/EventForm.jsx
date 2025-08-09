import React, { useState } from 'react';

const EventForm = ({ onSubmit }) => {
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    totalTickets: '',
    category: 'concert',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...eventForm,
      price: Number(eventForm.price),
      totalTickets: Number(eventForm.totalTickets)
    });
    setEventForm({
      title: '',
      description: '',
      date: '',
      location: '',
      price: '',
      totalTickets: '',
      category: 'concert',
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Créer un nouvel événement</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            value={eventForm.title}
            onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lieu</label>
          <input
            type="text"
            value={eventForm.location}
            onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="datetime-local"
            value={eventForm.date}
            onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Catégorie</label>
          <select
            value={eventForm.category}
            onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="concert">Concert</option>
            <option value="theatre">Théâtre</option>
            <option value="sport">Sport</option>
            <option value="cinema">Cinéma</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={eventForm.price}
            onChange={(e) => setEventForm({ ...eventForm, price: e.target.value })}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de billets</label>
          <input
            type="number"
            min="1"
            value={eventForm.totalTickets}
            onChange={(e) => setEventForm({ ...eventForm, totalTickets: e.target.value })}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={eventForm.image}
            onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={eventForm.description}
            onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
            required
            rows="3"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Créer l'événement
        </button>
      </div>
    </form>
  );
};

export default EventForm;
