import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', mobile: '', address: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'customer' })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || JSON.stringify(data));
      } else {
        // Auto sign-in or redirect to sign-in
        navigate('/signin');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '60px' }}>
      <div className="card" style={{ padding: '40px' }}>
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Sign Up for Bitezy</h2>
        {error && <div className="error-message" style={{ marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" className="input-field" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" className="input-field" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Mobile Number</label>
            <input type="text" name="mobile" className="input-field" value={formData.mobile} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Address</label>
            <textarea name="address" className="input-field" rows="3" value={formData.address} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/signin" style={{ color: 'var(--accent-color)' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
