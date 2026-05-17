import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRestaurant = () => {
  const [formData, setFormData] = useState({ name: '', image: '', cuisine: '', rating: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/restaurants/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add restaurant');
      }
      navigate('/admin/restaurants');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', padding: '40px 0' }}>
      <div className="card" style={{ padding: '40px' }}>
        <h2 style={{ marginBottom: '24px' }}>Add New Restaurant</h2>
        {error && <div className="error-message" style={{ marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Restaurant Name</label>
            <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Image URL</label>
            <input type="url" name="image" className="input-field" value={formData.image} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Cuisines</label>
            <input type="text" name="cuisine" className="input-field" placeholder="e.g. Italian, Chinese" value={formData.cuisine} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Rating</label>
            <input type="number" step="0.1" min="0" max="5" name="rating" className="input-field" value={formData.rating} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
            {loading ? 'Adding...' : 'Add Restaurant'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
