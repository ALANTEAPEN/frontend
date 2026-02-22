import React from 'react';

const Navigation = ({ user, onLogout }) => (
  <nav style={styles.nav}>
    <div style={styles.navBrand}>ConcertHub</div>
    <div style={styles.navLinks}>
      <a href="/dashboard" style={styles.navLink}>Dashboard</a>
      <a href="/mybookings" style={styles.navLink}>My Bookings</a>
      {user.role === 'admin' && (
        <a href="/admin" style={styles.navLink}>Admin Panel</a>
      )}
      <button onClick={onLogout} style={styles.navButton}>Logout</button>
    </div>
  </nav>
);

const styles = {
  nav: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navBrand: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  navButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    padding: '5px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
};

export default Navigation;