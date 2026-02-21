export default function ConcertCard({ concert, onBook }) {
  return (
    <div style={{
      background: "#111",
      color: "#fff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer"
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <h2 style={{ marginBottom: "10px" }}>{concert.name}</h2>

      <p>📍 {concert.venue}</p>
      <p>💰 ₹{concert.price}</p>
      <p>🎟 {concert.availableTickets} tickets left</p>

      <button
        onClick={() => onBook(concert._id)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
          border: "none",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "bold"
        }}
      >
        Book Ticket
      </button>
    </div>
  );
}