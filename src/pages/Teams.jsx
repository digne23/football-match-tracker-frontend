import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/teams.css";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({
    name: "",
    coach: "",
    logo: "",
    players: [
      {
        name: "",
        position: "",
        number: "",
        goals: "",
        assists: "",
        yellowcards: "",
        redcards: "",
      },
    ],
  });

  const [expandedTeams, setExpandedTeams] = useState({});


  const token = localStorage.getItem("token");

  // Fetch teams when the component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/teams`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeams(response.data);
        console.log("Fetched  teams:", response.data);
      } catch (err) {
        console.error("Error fetching teams", err);
      }
    };
    fetchTeams();
  }, []);

  // Handle input change for team and player fields
  function handleChange(e) {
    const { name, value } = e.target;

    if (name in newTeam) {
      setNewTeam({ ...newTeam, [name]: value });
    }
  }

  // Handle player field change (for dynamic player fields)
  function handlePlayerChange(index, e) {
    const { name, value } = e.target;

    const updatedPlayers = [...newTeam.players];
    updatedPlayers[index][name] = value;

    setNewTeam({ ...newTeam, players: updatedPlayers });
  }

  const handleAddPlayer = () => {
    setNewTeam({
      ...newTeam,
      players: [
        ...newTeam.players,
        {
          name: "",
          position: "",
          number: "",
          goals: "",
          assists: "",
          yellowcards: "",
          redcards: "",
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/teams`,
        newTeam,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Team created successfully!");
      setNewTeam({
        name: "",
        coach: "",
        logo: "",
        players: [
          {
            name: "",
            position: "",
            number: "",
            goals: "",
            assists: "",
            yellowcards: "",
            redcards: "",
          },
        ],
      });

      const updatedTeams = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/teams`
      );
      setTeams(updatedTeams.data);
    } catch (err) {
      console.error(err);
    }
  };

  
function toggleTeamPlayers(teamId) {
  setExpandedTeams((prev) => ({
    ...prev,
    [teamId]: !prev[teamId],
  }));
  }
  

  const [editingTeam, setEditingTeam] = useState(null);

  function startEditing(team) {
    setEditingTeam(team);
  }



  async function handleUpdateTeam(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/${editingTeam._id}`,
        editingTeam,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Team updated successfully");
      setEditingTeam(null);

      // Refresh teams
      const updated = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/teams`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeams(updated.data);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update team");
    }
  }



  return (
    <div className="teams-container">
      <div style={{ background: "#fff", padding: "1rem", color: "black" }}>
        <h2>Manage Teams</h2>
        <h3>Create a New Team</h3>
      </div>

      {/* ✅ Form to add new team */}
      <form onSubmit={handleSubmit} className="add-team-form">
        <input
          type="text"
          name="name"
          placeholder="Team Name"
          value={newTeam.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="coach"
          placeholder="Coach Name"
          value={newTeam.coach}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          value={newTeam.logo}
          onChange={handleChange}
        />

        <h4>Players</h4>
        {newTeam.players.map((player, index) => (
          <div key={index} className="player-form">
            <input
              type="text"
              name="name"
              placeholder="Player Name"
              value={player.name}
              onChange={(e) => handlePlayerChange(index, e)}
              required
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={player.position}
              onChange={(e) => handlePlayerChange(index, e)}
              required
            />
            <input
              type="number"
              name="number"
              placeholder="Jersey Number"
              value={player.number}
              onChange={(e) => handlePlayerChange(index, e)}
            />
            <input
              type="number"
              name="goals"
              placeholder="Goals"
              value={player.goals}
              onChange={(e) => handlePlayerChange(index, e)}
            />
            <input
              type="number"
              name="assists"
              placeholder="Assists"
              value={player.assists}
              onChange={(e) => handlePlayerChange(index, e)}
            />
            <input
              type="number"
              name="yellowcards"
              placeholder="Yellow Cards"
              value={player.yellowcards}
              onChange={(e) => handlePlayerChange(index, e)}
            />
            <input
              type="number"
              name="redcards"
              placeholder="Red Cards"
              value={player.redcards}
              onChange={(e) => handlePlayerChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddPlayer}>
          Add Player
        </button>
        <button type="submit">Create Team</button>
      </form>

      {editingTeam && (
        <form
          onSubmit={handleUpdateTeam}
          className="edit-team-form"
          style={{
            marginTop: "2rem",
            background: "#f0f0f0",
            padding: "1rem",
            borderRadius: "10px",
          }}
        >
          <h3>Editing Team: {editingTeam.name}</h3>
          <input
            type="text"
            value={editingTeam.coach}
            onChange={(e) =>
              setEditingTeam({ ...editingTeam, coach: e.target.value })
            }
            placeholder="Update Coach"
          />
          <input
            type="text"
            value={editingTeam.logo}
            onChange={(e) =>
              setEditingTeam({ ...editingTeam, logo: e.target.value })
            }
            placeholder="Update Logo URL"
          />

          <h4>Players</h4>
          {editingTeam.players.map((player, idx) => (
            <div key={idx}>
              <input
                type="text"
                value={player.name}
                onChange={(e) => {
                  const updatedPlayers = [...editingTeam.players];
                  updatedPlayers[idx].name = e.target.value;
                  setEditingTeam({ ...editingTeam, players: updatedPlayers });
                }}
                placeholder="Player Name"
              />
              <input
                type="text"
                value={player.position}
                onChange={(e) => {
                  const updatedPlayers = [...editingTeam.players];
                  updatedPlayers[idx].position = e.target.value;
                  setEditingTeam({ ...editingTeam, players: updatedPlayers });
                }}
                placeholder="Position"
              />
              {/* You can add fields for number, goals, etc., similarly */}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setEditingTeam({
                ...editingTeam,
                players: [
                  ...editingTeam.players,
                  {
                    name: "",
                    position: "",
                    number: "",
                    goals: "",
                    assists: "",
                    yellowcards: "",
                    redcards: "",
                  },
                ],
              })
            }
          >
            Add New Player
          </button>

          <br />
          <button type="submit">Save Changes</button>
        </form>
      )}

      <div className="team-list">
        <h3>Existing Teams</h3>
        <ul>
          {teams.map((team) => (
            <li key={team._id}>
              <div className="team-item">
                <img src={team.logo} alt={team.name} className="team-logo" />
                <div>
                  <h4>{team.name}</h4>
                  <p>Coach: {team.coach}</p>
                  <p>Players: {team.players.length}</p>
                  <button onClick={() => startEditing(team)}>Edit Team</button>

                  <button onClick={() => toggleTeamPlayers(team._id)}>
                    {expandedTeams[team._id]
                      ? "Hide Player Details"
                      : "View Player Details"}
                  </button>
                </div>
              </div>

              {/* 🔽 Player Details Dropdown */}
              {expandedTeams[team._id] && (
                <div className="player-details-dropdown">
                  <h5>Player Details</h5>
                  <ul>
                    {team.players.map((player, idx) => (
                      <li key={idx}>
                        <strong>{player.name}</strong> - {player.position}, #
                        {player.number}
                        <br />
                        Goals: {player.goals}, Assists: {player.assists}
                        <br />
                        Yellow Cards: {player.yellowcards}, Red Cards:{" "}
                        {player.redcards}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
