import React, { useState, useEffect } from 'react';
import api from '../api';

const MyBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/mine');
      setBookings(res.data.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await api.delete(`/bookings/${id}`);
      setMessage('Booking cancelled successfully!');
      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) return <div style={styles.container}>Loading bookings...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>My Bookings</h1>
        <p>Welcome, {user.name}!</p>
      </div>

      {message && <div style={styles.message}>{message}</div>}

      {bookings.length === 0 ? (
        <div style={styles.card}>
          <p>You haven't booked any tickets yet.</p>
        </div>
      ) : (
        bookings.map(booking => (
          <div key={booking._id} style={styles.bookingCard}>
            <h3>{booking.concert.name}</h3>
            <p><strong>Date:</strong> {new Date(booking.concert.datetime).toLocaleDateString()}</p>
            <p><strong>Venue:</strong> {booking.concert.venue}</p>
            <p><strong>Tickets:</strong> {booking.tickets}</p>
            <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <button 
              onClick={() => cancelBooking(booking._id)}
              style={styles.buttonDanger}
            >
              Cancel Booking
            </button>
          </div>
        ))
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
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: '1px solid #ddd',
    textAlign: 'center'
  },
  bookingCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: '1px solid #ddd',
    marginBottom: '20px'
  },
  buttonDanger: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  message: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px'
  }
};

export default MyBookings;
