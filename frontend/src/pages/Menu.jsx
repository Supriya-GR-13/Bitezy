import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Menu = ({ addToCart }) => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurantAndMenu();
  }, [restaurantId]);

  const fetchRestaurantAndMenu = async () => {
    try {
      const [resResponse, menuResponse] = await Promise.all([
        fetch(`http://localhost:8000/api/restaurants/${restaurantId}/`),
        fetch(`http://localhost:8000/api/menu/${restaurantId}/`)
      ]);
      
      if (!resResponse.ok || !menuResponse.ok) throw new Error('Failed to fetch data');
      
      const resData = await resResponse.json();
      const menuData = await menuResponse.json();
      
      setRestaurant(resData);
      setMenuItems(menuData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading menu...</div>;
  if (error) return <div className="container" style={{ padding: '40px 0', textAlign: 'center', color: 'var(--error-color)' }}>{error}</div>;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      {restaurant && (
        <div style={{ marginBottom: '40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '32px' }}>
          <h2 className="page-title">{restaurant.name}</h2>
          <p className="page-subtitle">{restaurant.cuisine} • ★ {restaurant.rating}</p>
        </div>
      )}
      
      <h3 style={{ fontSize: '24px', marginBottom: '24px' }}>Menu</h3>
      
      {menuItems.length === 0 ? (
        <div className="empty-state">
          <h3>No items found</h3>
          <p>This restaurant hasn't added any menu items yet.</p>
        </div>
      ) : (
        <div className="grid-menu">
          {menuItems.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', padding: '20px', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {item.isVeg ? (
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '1px solid green', borderRadius: '50%', backgroundColor: 'green' }} title="Veg"></span>
                  ) : (
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '1px solid red', borderRadius: '50%', backgroundColor: 'red' }} title="Non-Veg"></span>
                  )}
                  <h4 style={{ fontSize: '18px', margin: 0 }}>{item.name}</h4>
                </div>
                <p style={{ fontWeight: '600', marginBottom: '8px' }}>${parseFloat(item.price).toFixed(2)}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={() => addToCart(item, restaurant)}>Add to Cart</button>
              </div>
              <img 
                src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'} 
                alt={item.name} 
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
