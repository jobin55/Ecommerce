import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="ecom-nav">
      <Link to="/" className="ecom-logo">JOBS</Link>
      <div className="ecom-nav-links">
        <Link to="/" className="ecom-nav-link">Shop</Link>
        <Link to="/" className="ecom-nav-link">Collections</Link>
        <Link to="/" className="ecom-nav-link">About</Link>
        <Link to="/todo" className="ecom-btn-primary">
          Task Manager
        </Link>
        {user ? (
          <div className="ecom-nav-user">
            <span className="user-name">
              {user.name} {isAdmin && <span className="admin-badge">Admin</span>}
            </span>
            <button onClick={handleLogout} className="ecom-btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="ecom-nav-link">Login</Link>
            <Link to="/register" className="ecom-btn-secondary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
