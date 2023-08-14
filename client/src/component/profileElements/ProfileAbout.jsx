import React, { useContext } from "react";
import "../../styles/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { context } from "../Contextapi";

const ProfileAbout = () => {
    const { user } = useContext(context);
  
    return (
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
    );
  };

  export default ProfileAbout;