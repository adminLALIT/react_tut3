import React from "react";
import "../../styles/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Timeline = () => {

    return (
      <div
        className="tab-pane  show active"
        id="profile"
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
    );
  };

  export default Timeline;