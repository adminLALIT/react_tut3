import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth";

const Register = () => {
  const navigate = useNavigate();
  const { user, registerAndLogin } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = formData.phone.replace(/\D/g, "");
    if (phoneNumber.length < 10 || isNaN(phoneNumber)) {
      formData.phone = "";
      setPhoneError("Please enter a valid 10-digit phone number.");
    } else {
      setPhoneError("");

      registerAndLogin(formData);

      let el = document.getElementsByClassName("container");
      el[0].innerHTML = "<h3>You are now successfully registered and logged in.</h3>";
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
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
            <h4>New here? Sign up then!</h4>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
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
                onChange={handleChange}
                value={formData.email}
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
                placeholder="Create a password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                maxLength={10}
                placeholder={phoneError ? phoneError : "Your Phone No."}
                onChange={handleChange}
                value={formData.phone}
                required
              />
            </div>
            <button type="submit" className="btn submit-btn">
              Create account
            </button>
          </form>
          <div className="sign-in">
            <p>
              Already have an account? <Link to={"/login"}>Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
