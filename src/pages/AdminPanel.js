import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminPanel = ({ user }) => {
  const [concerts, setConcerts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    datetime: '',
    venue: '',
    price: '',
    availableTickets: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const res = await api.get('/concerts');
      setConcerts(res.data.data);
    } catch (err) {
      console.error('Failed to fetch concerts:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.post('/concerts', {
        ...formData,
        datetime: new Date(formData.datetime),
        price: Number(formData.price),
        availableTickets: Number(formData.availableTickets)
      });
      
      setMessage('Concert created successfully!');
      setFormData({ name: '', datetime: '', venue: '', price: '', availableTickets: '' });
      fetchConcerts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create concert');
    } finally {
      setLoading(false);
    }
  };

  const deleteConcert = async (id) => {
    if (!confirm('Are you sure you want to delete this concert?')) return;

    try {
      await api.delete(`/concerts/${id}`);
      setMessage('Concert deleted successfully!');
      fetchConcerts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete concert');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Admin Panel</h1>
        <p>Welcome, {user.name}!</p>
      </div>

      <div style={styles.card}>
        <h2>Create Concert</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Concert Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="datetime-local"
            value={formData.datetime}
            onChange={(e) => setFormData({...formData, datetime: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Venue"
            value={formData.venue}
            onChange={(e) => setFormData({...formData, venue: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="number"
            placeholder="Available Tickets"
            value={formData.availableTickets}
            onChange={(e) => setFormData({...formData, availableTickets: e.target.value})}
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Creating...' : 'Create Concert'}
          </button>
          {message && <div style={styles.message}>{message}</div>}
        </form>
      </div>

      <div style={styles.card}>
        <h2>Existing Concerts</h2>
        {concerts.map(concert => (
          <div key={concert._id} style={styles.concertItem}>
            <div>
              <strong>{concert.name}</strong> - {new Date(concert.datetime).toLocaleDateString()}
              <br />
              {concert.venue} - ${concert.price} - {concert.availableTickets} tickets
            </div>
            <button 
              onClick={() => deleteConcert(concert._id)}
              style={styles.buttonDanger}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: '1px solid #ddd',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  buttonDanger: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  message: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '10px'
  },
  concertItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee'
  }
};

export default AdminPanel;