import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setError("");
      await signup(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        <h2>Sign Up</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔴 THIS IS CRITICAL */}
        <button
          type="button"
          className="primary-btn"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="link-text" onClick={() => navigate("/login")}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}

export default Signup;
