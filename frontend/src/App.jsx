import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/admin/Dashboard';
import AddRestaurant from './pages/admin/AddRestaurant';
import RestaurantList from './pages/admin/RestaurantList';
import UpdateRestaurant from './pages/admin/UpdateRestaurant';
import MenuManager from './pages/admin/MenuManager';
import Menu from './pages/Menu';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
  };

  const addToCart = (item, restaurant) => {
    const updatedCart = [...cart, { ...item, restaurantName: restaurant.name }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        
        {/* Customer Routes */}
        <Route path="/home" element={user && user.role !== 'admin' ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/menu/:restaurantId" element={user ? <Menu addToCart={addToCart} /> : <Navigate to="/signin" />} />
        <Route path="/cart" element={user ? <Cart cart={cart} removeFromCart={removeFromCart} /> : <Navigate to="/signin" />} />
        <Route path="/checkout" element={user ? <Checkout cart={cart} clearCart={clearCart} /> : <Navigate to="/signin" />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/signin" />} />
        <Route path="/admin/add-restaurant" element={user && user.role === 'admin' ? <AddRestaurant /> : <Navigate to="/signin" />} />
        <Route path="/admin/restaurants" element={user && user.role === 'admin' ? <RestaurantList /> : <Navigate to="/signin" />} />
        <Route path="/admin/update-restaurant/:id" element={user && user.role === 'admin' ? <UpdateRestaurant /> : <Navigate to="/signin" />} />
        <Route path="/admin/menu/:restaurantId" element={user && user.role === 'admin' ? <MenuManager /> : <Navigate to="/signin" />} />
      </Routes>
      
      {user && user.role !== 'admin' && (
        <div className="floating-cart">
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.href = '/cart'}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShoppingCart size={20} />
            Go to Cart ({cart.length})
          </button>
        </div>
      )}
    </Router>
  );
}

export default App;
