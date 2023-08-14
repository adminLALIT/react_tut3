import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { context } from "./Contextapi";
import ProfileAbout from "./profileElements/ProfileAbout";
import Timeline from "./profileElements/Timeline";

const Profile = () => {
  const { user } = useContext(context);
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();

  const [file, setFile] = useState({});

  const imageRef = useRef(null);
  const saveRef = useRef(null);

  const handleImage = (e) => {
    const fileInfo = e.target.files;
    if (fileInfo) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageRef.current.src = event.target.result;
        setFile({
          filename: fileInfo[0].name.trim(),
          type: fileInfo[0].type,
          lastModifiedAt: fileInfo[0].lastModified,
          filepath: event.target.result,
        });
      };
      reader.readAsDataURL(fileInfo[0]);

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
        <>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                {user.image ? (
                  <img src={user.image} ref={imageRef} />
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
                {hide && (
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <Link to="/profile" className="nav-link" id="home-tab">
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/profile/timeline"
                        className="nav-link"
                        id="profile-tab"
                      >
                        Timeline
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="col-md-2">
              <Link
                onClick={() => {
                  setHide(!hide);
                  hide
                    ? navigate("/profile")
                    : navigate("/profile/editprofile");
                }}
                to="/profile/editprofile"
              >
                {hide ? "Edit Profile" : "See Info"}
              </Link>
            </div>
          </div>
          <div className="nav"></div>

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
                <Outlet />
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Profile;
