import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth";

const Login = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/refresh", {
        token: user.refreshToken,
      });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   axios.interceptors.request.use(
  //     async (config) => {
  //       const currentDate = new Date();
  //       if (user) {
  //         const decodedToken = jwt_decode(user.accessToken);
  //         if (decodedToken * 1000 < currentDate.getTime()) {
  //           const data = await refreshToken();
  //           console.log(data);
  //           config.headers["authorization"] = "Bearer " + data.accessToken;
  //         }
  //       }
  //       return config;
  //     },
  //     (err) => {
  //       return Promise.reject(err);
  //     }
  //   );
  // }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container">
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
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
