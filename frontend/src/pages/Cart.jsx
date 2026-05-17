import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  const groupedItems = cart.reduce((acc, item, index) => {
    if (!acc[item.restaurantName]) {
      acc[item.restaurantName] = [];
    }
    acc[item.restaurantName].push({ ...item, cartIndex: index });
    return acc;
  }, {});

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="container" style={{ padding: '40px 0', maxWidth: '800px' }}>
      <h2 className="page-title" style={{ marginBottom: '8px' }}>Hi {user.username}, here are your items</h2>
      <p className="page-subtitle" style={{ marginBottom: '32px' }}>Review your cart before proceeding to checkout</p>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p style={{ marginBottom: '24px' }}>Looks like you haven't added anything yet.</p>
          <Link to="/home" className="btn btn-primary">Browse Restaurants</Link>
        </div>
      ) : (
        <>
          <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
            {Object.keys(groupedItems).map((restaurantName) => (
              <div key={restaurantName} style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                  {restaurantName}
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {groupedItems[restaurantName].map((item) => (
                    <li key={item.cartIndex} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <h4 style={{ fontSize: '16px', margin: 0 }}>{item.name}</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>${parseFloat(item.price).toFixed(2)}</p>
                        </div>
                      </div>
                      <button className="btn btn-outline-accent" style={{ padding: '6px 12px', fontSize: '14px' }} onClick={() => removeFromCart(item.cartIndex)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '24px', margin: 0 }}>Total</h3>
              <h3 style={{ fontSize: '24px', margin: 0, color: 'var(--accent-color)' }}>${calculateTotal()}</h3>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }} onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
