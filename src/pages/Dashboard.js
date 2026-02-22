import React, { useState, useEffect } from 'react';
import api from '../api';

const Dashboard = ({ user }) => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
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
    } finally {
      setLoading(false);
    }
  };

  const bookTickets = async () => {
    if (!selectedConcert) return;

    setBookingLoading(true);
    setMessage('');

    try {
      const res = await api.post('/bookings', {
        concertId: selectedConcert._id,
        tickets: tickets
      });
      
      setMessage(res.data.message || 'Tickets booked successfully!');
      setConcerts(concerts.map(concert => 
        concert._id === selectedConcert._id 
          ? { ...concert, availableTickets: concert.availableTickets - tickets }
          : concert
      ));
      
      setTimeout(() => {
        setSelectedConcert(null);
        setMessage('');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div style={styles.container}>Loading concerts...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>ConcertHub</h1>
        <p>Welcome, {user.name}!</p>
      </div>
      
      <div style={styles.concertGrid}>
        {concerts.map(concert => (
          <div key={concert._id} style={styles.concertCard}>
            <h3>{concert.name}</h3>
            <p><strong>Date:</strong> {new Date(concert.datetime).toLocaleDateString()}</p>
            <p><strong>Venue:</strong> {concert.venue}</p>
            <p><strong>Price:</strong> ${concert.price}</p>
            <p><strong>Available:</strong> {concert.availableTickets} tickets</p>
            <button 
              onClick={() => setSelectedConcert(concert)}
              disabled={concert.availableTickets === 0}
              style={concert.availableTickets === 0 ? styles.buttonDisabled : styles.button}
            >
              {concert.availableTickets === 0 ? 'Sold Out' : 'Book Tickets'}
            </button>
          </div>
        ))}
      </div>

      {selectedConcert && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Book Tickets - {selectedConcert.name}</h3>
            <p>Price: ${selectedConcert.price} per ticket</p>
            <p>Available: {selectedConcert.availableTickets} tickets</p>
            
            <div style={styles.formGroup}>
              <label>Number of tickets (max 3):</label>
              <select 
                value={tickets} 
                onChange={(e) => setTickets(Number(e.target.value))}
                style={styles.select}
              >
                {[1, 2, 3].map(num => (
                  <option key={num} value={num} disabled={num > selectedConcert.availableTickets}>
                    {num} ticket{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={styles.modalButtons}>
              <button 
                onClick={bookTickets} 
                disabled={bookingLoading}
                style={styles.button}
              >
                {bookingLoading ? 'Booking...' : `Book ${tickets} ticket${tickets > 1 ? 's' : ''} ($${tickets * selectedConcert.price})`}
              </button>
              <button 
                onClick={() => setSelectedConcert(null)} 
                style={styles.buttonSecondary}
              >
                Cancel
              </button>
            </div>
            
            {message && <div style={styles.message}>{message}</div>}
          </div>
        </div>
      )}
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
  concertGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%'
  },
  formGroup: {
    marginBottom: '15px'
  },
  modalButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    fontSize: '16px'
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  message: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '10px'
  }
};

export default Dashboard;