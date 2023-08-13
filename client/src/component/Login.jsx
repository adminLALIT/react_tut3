import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import "../styles/login.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const ref = useRef("");
  const eye = useRef();
  const eyeOff = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginSuccess = await login(email, password);
      if (loginSuccess) {
        ref.current.innerHTML = "<h3>Login Successfull</h3>";
        navigate("/");
      } else {
        setErrorMessage("Invalid Credentials!");
      }
    } catch (err) {
      setErrorMessage("An error occurred during login attempt.");
      console.warn(err);
    }
  };

  const handleOff = (e) => {
    eye.current.style.display = "none";
    eyeOff.current.style.display = "block";
    passwordRef.current.type = "text";
  };
  const handleOn = (e) => {
    eye.current.style.display = "block";
    eyeOff.current.style.display = "none";
    passwordRef.current.type = "password";
  };
  // setUser(user);
  return (
    <div ref={ref} className="container">
      <header className="row text-center"></header>
      <main className="main row">
        <div className="left col">
          <img
            src="https://img.freepik.com/premium-vector/young-woman-enjoy-sitting-reading-book-hygge-concept-vector-illustration_194708-2078.jpg"
            alt="girl-reading-a-book"
          />
        </div>
        <div className="right col">
          <form className="sign-up" onSubmit={handleSubmit}>
            <h4>Login</h4>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-3" style={{ position: "relative" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                ref={passwordRef}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <VisibilityIcon
                ref={eye}
                className="eyeIcon"
                onClick={handleOff}
              />
              <VisibilityOffIcon
                ref={eyeOff}
                className="offEyeIcon"
                onClick={handleOn}
              />
              {errorMessage && <p className="emailError">{errorMessage}</p>}
            </div>
            <button type="submit" className="btn submit-btn">
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
