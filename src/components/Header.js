import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './Header.css';

function Header() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Fecha menu ao clicar fora
  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [menuOpen]);

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/filmes', label: 'Filmes' },
    { path: '/equipe', label: 'Equipe' },
  ];

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() || '?';

  return (
    <>
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

            {isAuthenticated ? (
              <div className="user-menu" ref={menuRef}>
                <button
                  type="button"
                  className="user-trigger"
                  onClick={() => setMenuOpen(o => !o)}
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                >
                  <span className="user-avatar">{userInitial}</span>
                  <span className="user-name">{user.name}</span>
                </button>
                {menuOpen && (
                  <div className="user-dropdown" role="menu">
                    <div className="user-dropdown-info">
                      <p className="user-dropdown-name">{user.name}</p>
                      <p className="user-dropdown-email">{user.email}</p>
                    </div>
                    <button
                      type="button"
                      className="user-dropdown-item"
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="auth-trigger"
                onClick={() => setAuthOpen(true)}
              >
                Entrar
              </button>
            )}
          </nav>
        </div>
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Header;
