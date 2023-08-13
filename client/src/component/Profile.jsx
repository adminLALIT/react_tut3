import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { context } from "./Contextapi";

const Profile = () => {
  const { user } = useContext(context);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [file, setFile] = useState({});

  const [phoneError, setPhoneError] = useState("");

  const imageRef = useRef(null);
  const saveRef = useRef(null);

  const [profile, setProfile] = useState("");

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
          setProfile(`http://127.0.0.1:5173/server/uploads/${res.data.image}`);
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

  const handleImage = (e) => {
    const fileInfo = e.target.files;
    if (fileInfo) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageRef.current.src = event.target.result;
      };
      setFile({
        filename: fileInfo[0].name.trim(),
        type: fileInfo[0].type,
        lastModifiedAt: fileInfo[0].lastModified,
        filepath: imageRef.current.src,
      });
      reader.readAsDataURL(fileInfo[0]);

      window.localStorage.setItem("image", imageRef.current.src);

      saveRef.current.style.display = "block";
    }
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/api/uploadImage", { user: user, file: file })
      .then((res) => {
        console.log("Data sent to server");
      })
      .catch(() => {
        console.log("Something Went Wrong!");
      });
  };

  return (
    <>
      <div className="container emp-profile">
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                {user.image ? (
                  <img src={user.image} />
                ) : (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsI4BVJivucLQGLWcrITEnDbNwa6nE5fR4Ig&usqp=CAU"
                    alt=""
                    ref={imageRef}
                  />
                )}

                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input
                    type="file"
                    name="file"
                    accept="image/"
                    onChange={handleImage}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <p
                onClick={handleSave}
                className="saveImage btn btn-primary"
                ref={saveRef}
                style={{ display: "none" }}
              >
                Save
              </p>
              <div className="profile-head">
                <h5>{user.name}</h5>
                <h6>Web Developer and Designer</h6>
                <p className="proile-rating">
                  RANKINGS : <span>8/10</span>
                </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="">Website Link</a>
                <br />
                <a href="">Bootsnipp Profile</a>
                <br />
                <a href="">Bootply Profile</a>
                <p>SKILLS</p>
                <a href="">Web Designer</a>
                <br />
                <a href="">Web Developer</a>
                <br />
                <a href="">WordPress</a>
                <br />
                <a href="">WooCommerce</a>
                <br />
                <a href="">PHP, .Net</a>
                <br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <p>user{user.id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>Web Developer and Designer</p>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Your Bio</label>
                      <br />
                      <p>Your detail description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
