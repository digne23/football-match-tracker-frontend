import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";

export default function Home() {
  const [username, setUsername] = useState("Football Fan");
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
   const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Username from localStorage
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setUsername(user.name || "Football Fan");
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }

    // Fetch teams and matches
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Send the token in the Authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const teamRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/teams`,
          config
        );
        setTeams(teamRes.data);

        const matchRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/matches`,
          config
        );
        setMatches(matchRes.data);


         const leaderboardRes = await axios.get(
           `${import.meta.env.VITE_BACKEND_URL}/api/leaderboards`,
           config
         );
         setLeaderboard(leaderboardRes.data.leaderboard);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Derived Data
  const totalTeams = teams.length;
  const totalPlayers = Array.isArray(teams)
    ? teams.reduce(
        (acc, team) => acc + (team.players ? team.players.length : 0),
        0
      )
    : 0;

  const totalMatchesPlayed = matches.filter(
    (match) => match.status === "completed"
  ).length;

  const upcomingMatches = matches.filter((match) => {
    const matchDate = new Date(match.date);
    return matchDate > new Date();


  });

  const topTeams = leaderboard.slice(0, 3);

  return (
    <div className="home-container">
      <h1 className="text-4xl font-bold text-center my-6 text-blue-600">
        Football Match Tracker
      </h1>
      <header className="hero-section">
        <h1>Welcome back, {username}! ⚽</h1>
        <p className="tagline">
          Track matches. Manage teams. Dominate the leaderboard.
        </p>
      </header>

      <section className="stats-section">
        <div className="stat-card">
          <h2>{totalTeams}</h2>
          <p>Total Teams</p>
        </div>
        <div className="stat-card">
          <h2>12</h2>
          <p>Matches Played </p>
        </div>
        <div className="stat-card">
          <h2>{totalPlayers}</h2>
          <p>Players Registered</p>
        </div>
      </section>

      <section className="upcoming-section">
        <h2>Upcoming Matches 🔥</h2>
        {upcomingMatches.length === 0 ? (
          <p>No upcoming matches.</p>
        ) : (
          upcomingMatches.map((match) => (
            <div key={match._id} className="match-preview">
              <p>
                ⚔️ {match.team1.name} vs {match.team2.name}
              </p>
              <p>📅 {new Date(match.date).toLocaleString()}</p>
            </div>
          ))
        )}
      </section>

      <section className="leaderboard-highlight">
        <h2>Leaderboard Highlights 🏆</h2>
        {topTeams.length > 0 ? (
          <ul>
            {topTeams.map((team, index) => (
              <li key={team.teamId}>
                {`${index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"} ${
                  team.name
                } - ${team.points} pts`}
              </li>
            ))}
          </ul>
        ) : (
          <p>No teams in the leaderboard yet.</p>
        )}
      </section>

      <section className="cta-buttons">
        <button onClick={() => navigate("/teams")}>Manage Teams</button>
        <button onClick={() => navigate("/matches")}>View Matches</button>
        <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
      </section>
    </div>
  );
}
