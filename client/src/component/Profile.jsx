import React, { useEffect, useRef, useState } from "react";
import "../styles/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const [phoneError, setPhoneError] = useState("");

  const imageRef = useRef(null);

  const [profile, setProfile] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    const file = imageRef.current.files[0];
    
    // if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    // } else {
    //   setImageFile(null);
    //   alert("Please select an image file");
    // }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append("file", imageFile);

    const phoneNumber = formData.phone.replace(/\D/g, "");
    if (phoneNumber.length < 10 || isNaN(phoneNumber)) {
      formData.phone = "";
      setPhoneError("Please enter a valid 10-digit phone number.");
    } else {
      setPhoneError("");

      axios
        .post("http://localhost:5000/api/uploadImage", fileData)
        .then((res) => {
          console.log("Data sent to server");
          setProfile(`http://127.0.0.1:5173/server/uploads/${res.data.image}`)
          console.log(res.data.image);
          setFormData({
            name: "",
            email: "",
            phone: "",
          });
          setImageFile(null);
        })
        .catch(() => {
          console.log("Something Went Wrong!");
        });

      axios
        .post("http://localhost:5000/api/update", formData)
        .then((res) => {
          console.log("Data sent to server");
          
          setFormData({
            name: "",
            email: "",
            phone: "",
          });
          setImageFile(null);
        })
        .catch(() => {
          console.log("Something Went Wrong!");
        });
    }
  };

  useEffect(()=>{

  })

  return (
    <>
      <div className="wrapper">
        <div className="profileAvatar">
          <div className="avatar">
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              // accept="image/"
              className="file-input"
              onChange={handleFileChange}
              ref={imageRef}
            />
            <label htmlFor="fileInput" className="file-label"></label>
          </div>
          <div className="profileInfo">
            <div className="profileName">Harvey Spectre</div>
            <span className="profileEmail">harveyspectre@gmail.com</span>
          </div>
        </div>
        <div className="editProfile">
          <form action="" className="updateForm" onSubmit={handleSubmit}>
            <h4>Edit Profile</h4>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Harvey Spectre"
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
                placeholder="harveyspectre@gmail.com"
                onChange={handleChange}
                value={formData.email}
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
                placeholder="9999999999"
                onChange={handleChange}
                value={formData.phone}
                required
              />
            </div>
            <button type="submit" className="btn submit-btn">
              Update
            </button>
          </form>
        </div>
        {/* <img src={profile} alt="" className="theImage"/> */}
        <video src="{profile}" className="theImage"/>
      </div>
    </>
  );
};

export default Profile;
