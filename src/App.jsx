
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Teams from "./pages/Teams"
import Matches from "./pages/Matches"
import Leaderboard from "./pages/Leaderboard"
export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="spacer"></div>
      <div className="main-app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}
