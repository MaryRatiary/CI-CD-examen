import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import EventCard from './components/EventCard';
import EventForm from './components/EventForm';
import TicketModal from './components/TicketModal';
import EventsPage from './pages/EventsPage';
import TicketsPage from './pages/TicketsPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const Home = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/events');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des événements');
      }
      const data = await response.json();
      setEvents(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyTickets = (event) => {
    setSelectedEvent(event);
  };

  const handleConfirmPurchase = async (quantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Veuillez vous connecter pour acheter des billets');
      }

      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId: selectedEvent._id,
          quantity
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'achat');
      }

      await fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error('Erreur lors de l\'achat des billets:', error);
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Événements à venir</h1>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <p className="text-gray-600">Chargement des événements...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onBuyTickets={handleBuyTickets}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <TicketModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
};

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUserTickets();
    }
  }, []);

  const fetchUserTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tickets/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des billets');
      }
      const data = await response.json();
      setTickets(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Mes Billets</h1>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <p className="text-gray-600">Chargement des billets...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map(ticket => (
            <div key={ticket._id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold">{ticket.eventId?.title || 'Chargement...'}</h3>
              <p className="text-gray-600">Code du billet : {ticket.ticketCode}</p>
              <p className="text-gray-600">
                Date : {ticket.eventId?.date ? new Date(ticket.eventId.date).toLocaleDateString() : 'Chargement...'}
              </p>
              <p className="text-gray-600">Status : {ticket.status}</p>
            </div>
          ))}
          {tickets.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              Vous n'avez pas encore de billets
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto py-6 px-4">
            <Routes>
              <Route path="/" element={<EventsPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tickets"
                element={
                  <PrivateRoute>
                    <Tickets />
                  </PrivateRoute>
                }
              />
              <Route
                path="/events/create"
                element={
                  <PrivateRoute>
                    <EventForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/events/:id/edit"
                element={
                  <PrivateRoute>
                    <EventForm />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
