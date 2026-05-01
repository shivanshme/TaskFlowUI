import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username) return;
    localStorage.setItem("user", username);
    navigate("/dashboard");
  };

  return (
    <div className="login-container"
      style={{
    backgroundImage: "url('/bg.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>
      <div className="login-overlay"></div>

      <div className="login-card">
        <h1 className="login-title">Welcome to the Flow</h1>
        <p className="login-subtitle">Focus. Move. Complete.</p>

        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button className="login-button" onClick={handleLogin}>
          Enter
        </button>
      </div>
    </div>
  );
}