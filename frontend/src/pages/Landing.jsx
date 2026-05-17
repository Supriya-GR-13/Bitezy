import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const foods = ['🍕', '🍔', '🍚', '🍛', '🍜', '🍣', '🥗', '🍗', '🥪', '🍦'];
  
  // Generate random positions and delays for floating food
  const floatingElements = Array.from({ length: 20 }).map((_, i) => {
    const food = foods[Math.floor(Math.random() * foods.length)];
    const left = `${Math.random() * 100}%`;
    const animationDelay = `${Math.random() * 15}s`;
    const animationDuration = `${10 + Math.random() * 10}s`;
    const fontSize = `${24 + Math.random() * 32}px`;
    
    return (
      <div 
        key={i} 
        className="floating-food" 
        style={{ left, animationDelay, animationDuration, fontSize }}
      >
        {food}
      </div>
    );
  });

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="floating-food-container">
        {floatingElements}
      </div>
      
      <div className="container" style={{ textAlign: 'center', paddingTop: '100px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <h1 className="page-title" style={{ fontSize: '48px', marginBottom: '16px' }}>Welcome to Bitezy 🍽️</h1>
        <p className="page-subtitle" style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '600px', backgroundColor: 'rgba(247, 246, 243, 0.8)', padding: '12px', borderRadius: '8px' }}>
          Order food from your favorite restaurants and get it delivered hot and fresh to your doorstep.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/signup" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '18px' }}>Sign Up</Link>
          <Link to="/signin" className="btn btn-secondary" style={{ padding: '16px 40px', fontSize: '18px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
