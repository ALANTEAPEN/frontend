import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import MyBookings from './pages/MyBookings';
import Navigation from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowLogin(true);
  };

  if (!user) {
    return (
      <div>
        {showLogin ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Register onRegister={() => setShowLogin(true)} />
        )}
        <div style={styles.switchAuth}>
          <button onClick={() => setShowLogin(!showLogin)} style={styles.linkButton}>
            {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/mybookings" element={<MyBookings user={user} />} />
        {user.role === 'admin' && (
          <Route path="/admin" element={<AdminPanel user={user} />} />
        )}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

const styles = {
  switchAuth: {
    textAlign: 'center',
    marginTop: '20px'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px'
  }
};

export default App;