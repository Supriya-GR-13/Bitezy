import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/signin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Invalid credentials');
      } else {
        onLogin(data.user, data.token);
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Large background sandwich */}
      <div style={{ 
        position: 'absolute', 
        fontSize: '400px', 
        opacity: 0.1, 
        transform: 'rotate(-15deg)', 
        zIndex: -1,
        pointerEvents: 'none'
      }}>
        🥪
      </div>
      
      <div className="container" style={{ maxWidth: '400px', width: '100%', zIndex: 1 }}>
        <div className="card" style={{ padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Sign In</h2>
        {error && <div className="error-message" style={{ marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" className="input-field" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" className="input-field" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Sign In</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-color)' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
