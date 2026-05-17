import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '100px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="page-title" style={{ fontSize: '48px', marginBottom: '16px' }}>Welcome to Bitezy 🍽️</h1>
      <p className="page-subtitle" style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '600px' }}>
        Order food from your favorite restaurants and get it delivered hot and fresh to your doorstep.
      </p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/signup" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '18px' }}>Sign Up</Link>
        <Link to="/signin" className="btn btn-secondary" style={{ padding: '16px 40px', fontSize: '18px' }}>Sign In</Link>
      </div>
    </div>
  );
};

export default Landing;
