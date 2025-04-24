import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password:""
  })

  const navigate = useNavigate()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name] : e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let  response = await axios.post("http://localhost:5000/api/auth/register",formData)
      alert("registration sucessful")
      navigate("/login")
    } catch (err) {
      alert(err?.response?.data.message || "registration failed")
    }
  }




  return (
    <div>
      <h2>Register here !</h2>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        ></input><br></br>
        <input type="email"
          placeholder="your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        ></input><br></br>
        <input type="password"
          placeholder="enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input><br>
        </br>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}