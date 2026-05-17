import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/restaurants/');
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this restaurant? This will remove all its menu items too.')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/restaurants/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete');
      setRestaurants(restaurants.filter(r => r.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Manage Restaurants</h2>
        <Link to="/admin/add-restaurant" className="btn btn-primary">Add Restaurant</Link>
      </div>

      {error && <div className="error-message" style={{ marginBottom: '16px' }}>{error}</div>}

      {restaurants.length === 0 ? (
        <div className="empty-state">
          <h3>No restaurants available</h3>
        </div>
      ) : (
        <div className="grid-restaurants">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <img 
                src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'} 
                alt={restaurant.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{restaurant.name}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{restaurant.cuisine} • ★ {restaurant.rating}</p>
                <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button className="btn btn-outline-accent" style={{ padding: '8px 12px', fontSize: '14px', flex: 1 }} onClick={() => navigate(`/admin/update-restaurant/${restaurant.id}`)}>Edit</button>
                  <button className="btn btn-outline-accent" style={{ padding: '8px 12px', fontSize: '14px', flex: 1 }} onClick={() => navigate(`/admin/menu/${restaurant.id}`)}>Menu</button>
                  <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '14px', flex: 1, borderColor: 'var(--error-color)', color: 'var(--error-color)' }} onClick={() => handleDelete(restaurant.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
