import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { API_BASE_URL } from "../../lib/api";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/v1/user/login`, {
        email,
        password,
      });

      if (data.success) {
        await login(data);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server not responding");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>Login</h2>
        <p>please enter your email & password</p>

        <div className="form-group mb-3">
          <input
            type="email"
            placeholder="enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          disabled={!email || !password}
          onClick={handleSubmit}
        >
          LOGIN
        </button>

        <p className="mt-3">
          Not A user? <NavLink to="/register">Register here!</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
