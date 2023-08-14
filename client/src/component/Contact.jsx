import React, { useState } from "react";
import axios from "axios";
import "../styles/contact.css";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/email", formData)
      .then((res) => console.log("Email Sent"))
      .catch((err) => console.warn(err));
  };

  return (
    <div className="contact-container">
      <div className="left-col"></div>
      <div className="right-col">
        <h1>Contact me</h1>
        <p>Need to get in touch with me? I'm all ears</p>

        <form id="contact-form" method="post" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Your Message"
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" id="submit" name="submit">
            Send
          </button>
        </form>
        <div id="error"></div>
        <div id="success-msg"></div>
      </div>
    </div>
  );
};

export default Contact;
