import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/matches.css'

export default function Matches() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    team1: "",
    team2: "",
    date: "",
    location: "",

    stats: {
      team1: {
        score: 0,
        possession: 50,
        shotsOnTarget: 0,
        shotsOffTarget: 0,
        corners: 0,
        yellowCards: 0,
        redCards: 0,
      },
      team2: {
        score: 0,
        possession: 50,
        shotsOnTarget: 0,
        shotsOffTarget: 0,
        corners: 0,
        yellowCards: 0,
        redCards: 0,
      },
    },
  });
    
    const [expandedMatchId, setExpandedMatchId] = useState(null);


useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const teamRes = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/teams`,
        {
          headers,
        }
      );
      setTeams(teamRes.data);

      const matchRes = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/matches`,
        {
          headers,
        }
      );
      setMatches(matchRes.data);
    } catch (err) {
      console.error("Fetching error:", err);
    }
  };

  fetchData();
}, []);


    function handleChange(e) {
    setNewMatch({ ...newMatch, [e.target.name]: e.target.value });
  }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

          if (!token) {
            alert("login first to create a match")
          }
            const response = await axios.post(
              `${process.env.REACT_APP_API_BASE_URL}/api/matches`,
              newMatch,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

    setNewMatch({
            team1: "",
            team2: "",
        date: "",
            location:""
        });

        const updated = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/matches`
        );
          setMatches(updated.data);
          alert("match created sucessfuly")
      
    } catch (err) {
      //alert(err.response?.data?.message || "match creation failed");
    }
    }
    
function toggleResults(matchId) {
  setExpandedMatchId((prev) => (prev === matchId ? null : matchId));
  }
  

  function handleStatChange(e, team, stat) {
    const value = e.target.value === "" ? "" : Number(e.target.value);

    setNewMatch((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [team]: {
          ...prev.stats[team],
          [stat]: value,
        },
      },
    }));
  }


  const deleteMatch = async (matchId) => {
    try {
      const token = localStorage.getItem("token"); // or wherever you're storing it
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/matches/${matchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove from UI
      setMatches((prevMatches) =>
        prevMatches.filter((match) => match._id !== matchId)
      );
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  };



  return (
    <div className="matches-container">
      <h2>Schedule a Match</h2>
      <form onSubmit={handleSubmit} className="match-form">
        <select
          name="team1"
          value={newMatch.team1}
          onChange={handleChange}
          required
        >
          <option value="">Select Team 1</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>

        <select
          name="team2"
          value={newMatch.team2}
          onChange={handleChange}
          required
        >
          <option value="">Select Team 2</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="date"
          placeholder="choose date"
          value={newMatch.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Match Location"
          value={newMatch.location}
          onChange={handleChange}
          required
        />

        {newMatch.team1 &&
          newMatch.team2 &&
          newMatch.date &&
          newMatch.location && (
            <>
              <h4>Enter Match Statistics</h4>
              <div className="stats-section">
                <div>
                  <h5>Team 1 Stats</h5>
                  <label>
                    Score:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team1.score}
                      onChange={(e) => handleStatChange(e, "team1", "score")}
                    />
                  </label>
                  <br />
                  <label>
                    Possession:{" "}
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={newMatch.stats.team1.possession}
                      onChange={(e) =>
                        handleStatChange(e, "team1", "possession")
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Shots On Target:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team1.shotsOnTarget}
                      onChange={(e) =>
                        handleStatChange(e, "team1", "shotsOnTarget")
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Shots Off Target:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team1.shotsOffTarget}
                      onChange={(e) =>
                        handleStatChange(e, "team1", "shotsOffTarget")
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Corners:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team1.corners}
                      onChange={(e) => handleStatChange(e, "team1", "corners")}
                    />
                  </label>
                  <br />
                  <label>
                    Yellow Cards:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team1.yellowCards}
                      onChange={(e) =>
                        handleStatChange(e, "team1", "yellowCards")
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Red Cards:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team1.redCards}
                      onChange={(e) => handleStatChange(e, "team1", "redCards")}
                    />
                  </label>
                  <br />
                </div>

                <div>
                  <h5>Team 2 Stats</h5>
                  <label>
                    Score:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team2.score}
                      onChange={(e) => handleStatChange(e, "team2", "score")}
                    />
                  </label>
                  <br />
                  <label>
                    Possession:{" "}
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={newMatch.stats.team2.possession}
                      onChange={(e) =>
                        handleStatChange(e, "team2", "possession")
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Shots On Target:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team2.shotsOnTarget}
                      onChange={(e) =>
                        handleStatChange(e, "team2", "shotsOnTarget")
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Shots Off Target:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team2.shotsOffTarget}
                      onChange={(e) =>
                        handleStatChange(e, "team2", "shotsOffTarget")
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Corners:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team2.corners}
                      onChange={(e) => handleStatChange(e, "team2", "corners")}
                    />
                  </label>
                  <br />
                  <label>
                    Yellow Cards:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team2.yellowCards}
                      onChange={(e) =>
                        handleStatChange(e, "team2", "yellowCards")
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Red Cards:{" "}
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={newMatch.stats.team2.redCards}
                      onChange={(e) => handleStatChange(e, "team2", "redCards")}
                    />
                  </label>
                  <br />
                </div>
              </div>
            </>
          )}

        <button type="submit">Schedule Match</button>
      </form>

      <h3>Scheduled Matches</h3>
      <ul className="match-list">
        {matches.map((match) => (
          <li key={match._id} className="match-item">
            <strong>
              {match.team1?.name} vs {match.team2?.name}
            </strong>
            <br />
            {new Date(match.date).toLocaleString()} @ {match.location}
            <button onClick={() => toggleResults(match._id)}>
              {expandedMatchId === match._id ? "Hide Results" : "View Results"}
            </button>
            <button
              onClick={() => deleteMatch(match._id)}
              className="delete-btn"
            >
              ❌ Delete Match
            </button>
            {expandedMatchId === match._id && (
              <div className="match-results">
                {match.stats ? (
                  <>
                    <p>
                      <strong>{match.team1?.name}:</strong>{" "}
                      {match.stats.team1.score} goals
                    </p>
                    <p>
                      <strong>{match.team2?.name}:</strong>{" "}
                      {match.stats.team2.score} goals
                    </p>

                    <h5>Match Stats</h5>
                    <div className="team-stats">
                      <div>
                        <h6>{match.team1?.name} Stats</h6>
                        <ul>
                          <li>Possession: {match.stats.team1.possession}%</li>
                          <li>
                            Shots On Target: {match.stats.team1.shotsOnTarget}
                          </li>
                          <li>
                            Shots Off Target: {match.stats.team1.shotsOffTarget}
                          </li>
                          <li>Corners: {match.stats.team1.corners}</li>
                          <li>Yellow Cards: {match.stats.team1.yellowCards}</li>
                          <li>Red Cards: {match.stats.team1.redCards}</li>
                        </ul>
                      </div>
                      <div>
                        <h6>{match.team2?.name} Stats</h6>
                        <ul>
                          <li>Possession: {match.stats.team2.possession}%</li>
                          <li>
                            Shots On Target: {match.stats.team2.shotsOnTarget}
                          </li>
                          <li>
                            Shots Off Target: {match.stats.team2.shotsOffTarget}
                          </li>
                          <li>Corners: {match.stats.team2.corners}</li>
                          <li>Yellow Cards: {match.stats.team2.yellowCards}</li>
                          <li>Red Cards: {match.stats.team2.redCards}</li>
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>No results yet.</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
