import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">EventTickets</span>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Événements
              </Link>

              {user && (
                <>
                  <Link
                    to="/tickets"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      location.pathname === '/tickets'
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Mes Billets
                  </Link>

                  {user.role === 'admin' && (
                    <Link
                      to="/users"
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        location.pathname === '/users'
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      Utilisateurs
                    </Link>
                  )}

                  {(user.role === 'admin' || user.role === 'organizer') && (
                    <Link
                      to="/events/create"
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        location.pathname === '/events/create'
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      Créer un événement
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {user.name}
                </span>
                <Link
                  to="/profile"
                  className={`text-sm ${
                    location.pathname === '/profile'
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`text-sm ${
                    location.pathname === '/login'
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                    location.pathname === '/register'
                      ? 'text-white bg-indigo-700'
                      : 'text-white bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
