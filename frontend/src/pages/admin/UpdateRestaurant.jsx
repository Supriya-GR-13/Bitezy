import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRestaurant = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', image: '', cuisine: '', rating: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/restaurants/${id}/`);
      if (!response.ok) throw new Error('Failed to fetch restaurant details');
      const data = await response.json();
      setFormData({
        name: data.name,
        image: data.image,
        cuisine: data.cuisine,
        rating: data.rating
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/restaurants/${id}/`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update restaurant');
      }
      navigate('/admin/restaurants');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ maxWidth: '600px', padding: '40px 0' }}>
      <div className="card" style={{ padding: '40px' }}>
        <h2 style={{ marginBottom: '24px' }}>Update Restaurant</h2>
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
            <input type="text" name="cuisine" className="input-field" value={formData.cuisine} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Rating</label>
            <input type="number" step="0.1" min="0" max="5" name="rating" className="input-field" value={formData.rating} onChange={handleChange} required />
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={saving}>
              {saving ? 'Updating...' : 'Update Restaurant'}
            </button>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/admin/restaurants')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRestaurant;
