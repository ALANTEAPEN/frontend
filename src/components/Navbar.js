import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ background: "#222", color: "#fff", padding: 15 }}>
      <Link to="/" style={{ marginRight: 10, color: "#fff" }}>Dashboard</Link>
      <Link to="/login" style={{ marginRight: 10, color: "#fff" }}>Login</Link>
      <Link to="/register" style={{ color: "#fff" }}>Register</Link>
    </div>
  );
}