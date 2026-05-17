import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MenuManager = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: '', description: '', price: '', isVeg: true });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [restaurantId]);

  const fetchData = async () => {
    try {
      const [resResponse, menuResponse] = await Promise.all([
        fetch(`http://localhost:8000/api/restaurants/${restaurantId}/`),
        fetch(`http://localhost:8000/api/menu/${restaurantId}/`)
      ]);
      
      if (!resResponse.ok || !menuResponse.ok) throw new Error('Failed to fetch data');
      
      setRestaurant(await resResponse.json());
      setMenuItems(await menuResponse.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const resetForm = () => {
    setFormData({ name: '', image: '', description: '', price: '', isVeg: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price,
      isVeg: item.isVeg
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/menu/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete');
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingId 
        ? `http://localhost:8000/api/menu/${editingId}/` 
        : `http://localhost:8000/api/menu/`;
      const method = editingId ? 'PUT' : 'POST';
      
      const payload = { ...formData, restaurant: restaurantId };
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('Failed to save menu item');
      
      fetchData(); // Refresh list
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading...</div>;
  if (error) return <div className="container" style={{ padding: '40px 0', textAlign: 'center', color: 'var(--error-color)' }}>{error}</div>;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '14px', marginBottom: '16px' }} onClick={() => navigate('/admin/restaurants')}>← Back to Restaurants</button>
          <h2 className="page-title" style={{ margin: 0 }}>{restaurant?.name} - Menu Management</h2>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>Add Menu Item</button>
        )}
      </div>

      {showForm && (
        <div className="card" style={{ padding: '32px', marginBottom: '40px', backgroundColor: '#fdfdfc' }}>
          <h3 style={{ marginBottom: '24px' }}>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Item Name</label>
                <input type="text" name="name" className="input-field" value={formData.name} onChange={handleFormChange} required />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Image URL</label>
                <input type="url" name="image" className="input-field" value={formData.image} onChange={handleFormChange} required />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Price</label>
                <input type="number" step="0.01" min="0" name="price" className="input-field" value={formData.price} onChange={handleFormChange} required />
              </div>
              <div className="input-group" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input type="checkbox" name="isVeg" id="isVeg" checked={formData.isVeg} onChange={handleFormChange} style={{ width: '20px', height: '20px' }} />
                <label htmlFor="isVeg" style={{ margin: 0 }}>Vegetarian Item</label>
              </div>
              <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                <label>Description</label>
                <textarea name="description" className="input-field" rows="3" value={formData.description} onChange={handleFormChange} required></textarea>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <button type="submit" className="btn btn-primary">{editingId ? 'Update Item' : 'Save Item'}</button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {menuItems.length === 0 ? (
        <div className="empty-state card">
          <h3>No menu items found</h3>
          <p>Add some delicious items to this restaurant's menu.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {menuItems.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', padding: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {item.isVeg ? (
                      <span style={{ display: 'inline-block', width: '10px', height: '10px', border: '1px solid green', borderRadius: '50%', backgroundColor: 'green' }}></span>
                    ) : (
                      <span style={{ display: 'inline-block', width: '10px', height: '10px', border: '1px solid red', borderRadius: '50%', backgroundColor: 'red' }}></span>
                    )}
                    <h4 style={{ fontSize: '18px', margin: 0 }}>{item.name}</h4>
                  </div>
                  <p style={{ fontWeight: '600', marginBottom: '4px' }}>${parseFloat(item.price).toFixed(2)}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0, maxWidth: '600px' }}>{item.description}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-outline-accent" style={{ padding: '8px 16px' }} onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-secondary" style={{ padding: '8px 16px', borderColor: 'var(--error-color)', color: 'var(--error-color)' }} onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuManager;
