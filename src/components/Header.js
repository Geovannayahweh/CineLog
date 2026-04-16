import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/filmes', label: 'Filmes' },
    { path: '/equipe', label: 'Equipe' },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-icon">🎬</span>
          <span className="logo-text">CineLog</span>
        </Link>

        <nav className="header-nav">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${location.pathname === path ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
