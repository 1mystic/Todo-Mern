import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navLinkClass =
  'mx-2 px-4 py-2 border-2 border-secondary bg-background text-secondary font-anime text-lg rounded-brutal shadow-brutal hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150';

const Header = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="sticky top-0 z-20 w-full px-4 py-4 bg-white shadow-soft flex items-center justify-between border-b-2 border-secondary">
      <h1 className="text-2xl font-anime tracking-widest text-primary">Mood Todo</h1>
      <nav className="flex items-center">
        <NavLink to="/" className={({ isActive }) => isActive ? navLinkClass + ' underline' : navLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? navLinkClass + ' underline' : navLinkClass}>
          Tasks
        </NavLink>
        <NavLink to="/mood" className={({ isActive }) => isActive ? navLinkClass + ' underline' : navLinkClass}>
          Mood
        </NavLink>
        {token ? (
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 border-2 border-primary bg-primary text-white font-anime text-lg rounded-brutal shadow-brutal hover:bg-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/signin" className={navLinkClass}>
            Sign In
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header; 