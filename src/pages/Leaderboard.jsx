import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/leaderboard.css"; // optional for custom styling

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [topscorers, setTopscorers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/leaderboards`
        );
        setLeaderboard(res.data.leaderboard);
        setTopscorers(res.data.topscorers);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏆 League Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((team, index) => (
            <tr key={team.teamId}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.drawn}</td>
              <td>{team.lost}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalDifference}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
