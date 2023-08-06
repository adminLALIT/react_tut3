import React, { useState } from "react";

const Contact = (props) => {
   
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.daata(formData);  
  };

  return (
    <div className="contact-form">
        <h3>Contact Me</h3>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleChange} placeholder="Enter your name" value={formData.name} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={handleChange} placeholder="Your Email" value={formData.email}  required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" onChange={handleChange} placeholder="What's on your mind?" value={formData.message}  required />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Contact;
