export default function ConcertCard({ concert, onBook }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: 20,
      margin: 10,
      borderRadius: 8
    }}>
      <h3>{concert.name}</h3>
      <p>{concert.venue}</p>
      <p>Price: ₹{concert.price}</p>
      <p>Tickets: {concert.availableTickets}</p>

      <button onClick={() => onBook(concert._id)}>
        Book 1 Ticket
      </button>
    </div>
  );
}