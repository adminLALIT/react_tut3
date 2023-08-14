import React, { useContext } from "react";
import { context } from "../Contextapi";
import "bootstrap/dist/css/bootstrap.min.css";

const EditProfile = () => {
  const { user } = useContext(context);
  return (
    <div style={{marginTop: "-25%"}}>
      <form className="">
        <h4>Edit Profile</h4>
        <div className="mb-1">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          {/* {errorMessage && (<p className="emailError">{ errorMessage }</p>)} */}
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Create a password"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            maxLength={10}
            placeholder={"Your Phone No."}
            required
          />
        </div>
        <button type="submit" className="btn submit-btn">
          Create account
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
