import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  // State to manage the mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="navbar">
        {/* Hamburger Icon for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          &#9776; {/* This is the hamburger icon (3 lines) */}
        </div>

        {/* Navbar Links */}
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link> |<Link to="/login">Login</Link> |
          <Link to="/register">Register</Link> |<Link to="/teams">Teams</Link> |
          <Link to="/matches">Matches</Link> |
          <Link to="/leaderboard">Leaderboard</Link>
        </div>
      </nav>
    </div>
  );
}
