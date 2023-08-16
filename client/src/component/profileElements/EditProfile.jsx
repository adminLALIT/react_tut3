import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../Contextapi";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";

const EditProfile = () => {
  // The USER
  const { user } = useContext(context);

  const navigate = useNavigate();

  const [editPrivate, setEditPrivate] = useState(false);
  const [verified, setVerified] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [modalError, setModalError] = useState(false);

  // Userinfo Form Data
  const [formData, setFormData] = useState({
    userId: user.id,
    profession: "",
    bio: "",
  });

  // User Profile Form Data
  const [privateData, setPrivateData] = useState({
    userId: user.id,
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  // Confirm User
  const [password, setPassword] = useState("");

  // Check Availaibility of email
  const emailRef = useRef(null);

  // User Info onchange
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // User Info Submit
  const handleInfoSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/updateinfo", formData)
      .then((res) => {
        console.log(res.data.msg);
        setTitle("Success!");
        setMessage("User Info Updated");
        setModalError(false);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.warn(err);
        setTitle("Failure!");
        setMessage("User Info Could not be updated");
        setModalError(true);
        setIsModalOpen(true);
      });
  };

  // Confirm User
  const handleVerifySubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/verify", { userId: user.id, password })
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.msg);
          setVerified(true);
          setTitle("Success!");
          setMessage("User Confirmed");
          setModalError(false);
          setIsModalOpen(true);
          navi;
        }
      })
      .catch((err) => {
        console.log("Incorrect Password!");
        console.warn(err);
        setPasswordError("Incorrect Password! Please try again.");
        setTitle("Failure!");
        setMessage("Incorrect Password! Please try again.");
        setModalError(true);
        setIsModalOpen(true);
      });
  };

  // User Profile onchange
  const handlePrivateChange = (e) => {
    const { name, value } = e.target;

    setPrivateData({
      ...privateData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/checkemail", {
        userId: user.id,
        email: emailRef.current.value,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setEmailError(res.data.msg);
        } else {
          setEmailError("");
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [privateData.email]);

  // User Profile submit
  const handlePrivateSubmit = (e) => {
    e.preventDefault();
    !emailError &&
      axios
        .post("http://localhost:5000/api/update", privateData)
        .then((res) => {
          console.log(res.data.msg);
          if (res.data.status === "success") {
            console.log("Success");
            setTitle("Success!");
            setMessage("User Successfully Updated");
            setModalError(false);
            setIsModalOpen(true);
          }
        })
        .catch((err) => {
          console.warn(err);
          setModalError(true);
          setTitle("Failure!");
          setMessage("User Could Not Be Updated!");
        });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ marginTop: "-35%" }}>
      {verified ? (
        <form className="sign-up" onSubmit={handlePrivateSubmit}>
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
              placeholder={user.name}
              onChange={handlePrivateChange}
              value={privateData.name}
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
              placeholder={user.email}
              onChange={handlePrivateChange}
              value={privateData.email}
              required
              ref={emailRef}
            />
          </div>
          <p>{emailError}</p>
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
              onChange={handlePrivateChange}
              value={privateData.password}
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
              placeholder={user.phone}
              onChange={handlePrivateChange}
              value={privateData.phone}
              required
            />
          </div>
          <button type="submit" className="btn submit-btn">
            Update Profile
          </button>
        </form>
      ) : !editPrivate ? (
        <form
          className="editProfile"
          onSubmit={handleInfoSubmit}
          style={{ marginTop: "0%" }}
        >
          <h4>Edit Info</h4>
          <div className="mb-1">
            <label htmlFor="profession" className="form-label">
              Profession
            </label>
            <input
              type="text"
              className="form-control"
              id="profession"
              name="profession"
              placeholder="Your Profession"
              required
              onChange={handleInfoChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              placeholder="Highlight yourself in brief"
              required
              onChange={handleInfoChange}
            />
          </div>
          <button type="submit" className="btn submit-btn">
            Update Info
          </button>
        </form>
      ) : (
        <form
          className="editProfile"
          onSubmit={handleVerifySubmit}
          style={{ marginTop: "0%" }}
        >
          <h4>Verify User</h4>
          <div className="mb-1">{user.email}</div>
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Verify Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>{passwordError}</p>
          <button type="submit" className="btn submit-btn">
            Verify
          </button>
        </form>
      )}
      {!verified &&
        (!editPrivate ? (
          <Link onClick={() => setEditPrivate(!editPrivate)}>
            Update Private Info
          </Link>
        ) : (
          <Link onClick={() => setEditPrivate(!editPrivate)}>Update Info</Link>
        ))}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        message={message}
        error={modalError}
      />
    </div>
  );
};

export default EditProfile;
