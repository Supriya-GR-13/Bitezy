import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout, cartCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to={user?.role === 'admin' ? '/admin' : (user ? '/home' : '/')} className="navbar-brand">
          🍽️ Bitezy
        </Link>
        <div className="navbar-nav">
          {!user ? (
            <>
              <Link to="/signin" className="nav-link">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          ) : (
            <>
              {user.role === 'admin' ? (
                <>
                  <span className="nav-link">Welcome Admin</span>
                  <Link to="/admin" className="nav-link">Dashboard</Link>
                </>
              ) : (
                <>
                  <span className="nav-link">Welcome {user.username}</span>
                  <Link to="/home" className="nav-link">Restaurants</Link>
                  <Link to="/cart" className="nav-link">Cart ({cartCount})</Link>
                </>
              )}
              <button onClick={handleLogout} className="btn btn-secondary" style={{ marginLeft: '16px' }}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
