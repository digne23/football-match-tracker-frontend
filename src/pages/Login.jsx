import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/login.css'


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        "https://football-match-tracker-backend-1.onrender.com/api/auth/login",
        formData
      );
   
      const { token, user } = response.data
      
      localStorage.setItem("token", token);
      localStorage.setItem("user",JSON.stringify(user))

      alert("login succesfull");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "login failed");
    }
  }

  return (
    <div>
      <h2>Login here !</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="your email"
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="your password"
          onChange={handleChange}
        ></input>
        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
