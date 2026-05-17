import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
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

  if (loading) return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading restaurants...</div>;
  if (error) return <div className="container" style={{ padding: '40px 0', textAlign: 'center', color: 'var(--error-color)' }}>{error}</div>;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h2 className="page-title" style={{ marginBottom: '32px' }}>Restaurants</h2>
      {restaurants.length === 0 ? (
        <div className="empty-state">
          <h3>No restaurants found</h3>
          <p>Check back later for new delicious options!</p>
        </div>
      ) : (
        <div className="grid-restaurants">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="card" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => navigate(`/menu/${restaurant.id}`)}>
              <img 
                src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'} 
                alt={restaurant.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{restaurant.name}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{restaurant.cuisine}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#eef6ee', color: 'var(--success-color)', padding: '4px 8px', borderRadius: '4px', fontWeight: '500', fontSize: '14px' }}>
                    ★ {restaurant.rating}
                  </span>
                  <button className="btn btn-outline-accent" style={{ padding: '8px 16px' }} onClick={(e) => { e.stopPropagation(); navigate(`/menu/${restaurant.id}`); }}>View Menu</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
