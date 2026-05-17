import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container" style={{ padding: '40px 0', maxWidth: '800px' }}>
      <h2 className="page-title" style={{ marginBottom: '32px' }}>Welcome Admin</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏪</div>
          <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Manage Restaurants</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>View, update, or delete existing restaurants and their menus.</p>
          <Link to="/admin/restaurants" className="btn btn-primary">Show Restaurants</Link>
        </div>
        
        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>➕</div>
          <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Add Restaurant</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Partner with new restaurants and add them to the platform.</p>
          <Link to="/admin/add-restaurant" className="btn btn-outline-accent">Add New Restaurant</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
