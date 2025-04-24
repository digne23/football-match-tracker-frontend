import { Link } from 'react-router-dom'
import "../styles/navbar.css"
export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link> |{""}
        <Link to="/login">Login</Link> | {""}
        <Link to="/register">Register</Link> | {""}
        <Link to="/teams">Teams</Link> | {""}
        <Link to="/matches">Matches</Link> | {""}
        <Link to="/leaderboard">Leaderboard</Link> | {""}
      </nav>
    </div>
  );
}
