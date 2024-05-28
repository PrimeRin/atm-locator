import React, { useState } from "react";
import rmalogo from "../../assets/img/rma-logo.png";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8082/login", {
        username,
        password,
      });
  
      if (response.data.success) {
        localStorage.setItem('jwtToken', response.data.accessToken);
        navigate("/admin-dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Incorrect Username or Password!");
    }
  };

  return (
    <div className="Logincontainer">
      <button className="cross-btn" onClick={onClose}>X</button>
      <div>
        <img src={rmalogo} alt="rmalogo" className="logo" />
        <h4>ATM LOCATOR</h4>
      </div>
      <form onSubmit={handleSubmit} className="loginform">
        <input
          type="text"
          placeholder="User ID"
          required
          onChange={(e) => setUsername(e.target.value)}
          className="logininputs"
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="logininputs"
        />
        <button type="submit" className="loginbutton">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
