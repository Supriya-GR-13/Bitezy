import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, clearCart }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/orders/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          items: cart,
          total_price: calculateTotal()
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Payment failed');
      
      setSuccess(true);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#eef6ee', color: 'var(--success-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 24px' }}>
          ✓
        </div>
        <h2 className="page-title">Payment Successful</h2>
        <p className="page-subtitle" style={{ marginBottom: '32px' }}>Your order has been placed and will be delivered shortly.</p>
        <button className="btn btn-primary" onClick={() => navigate('/home')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 0', maxWidth: '600px' }}>
      <h2 className="page-title" style={{ marginBottom: '32px' }}>Checkout</h2>
      
      <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Order Summary</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
          {cart.map((item, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>{item.name} <span style={{ fontSize: '12px', opacity: 0.7 }}>x1</span></span>
              <span>${parseFloat(item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '24px', margin: 0 }}>Total to Pay</h3>
          <h3 style={{ fontSize: '24px', margin: 0, color: 'var(--accent-color)' }}>${calculateTotal()}</h3>
        </div>
      </div>
      
      {error && <div className="error-message" style={{ marginBottom: '24px', textAlign: 'center', backgroundColor: '#fdeded', padding: '16px', borderRadius: '8px' }}>{error}</div>}
      
      <button 
        className="btn btn-primary" 
        style={{ width: '100%', padding: '16px', fontSize: '18px' }} 
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : `Pay $${calculateTotal()}`}
      </button>
      <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
        * Simulated Payment System (Test Mode)
      </p>
    </div>
  );
};

export default Checkout;
