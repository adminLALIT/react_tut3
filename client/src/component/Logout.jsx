import React, { useEffect, useState } from "react";
import useAuth from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate;

  // const handleLogout = async () => {
  //   const isLoggedOut = await logout();
  //   return isLoggedOut;
  //   // if (isLoggedOut) {
  //   //   navigate("/register");
  //   // }
  // };
  useEffect(() => {
    logout();
  }, []);

  // useEffect(() => {
  //   handleLogout()
  //     .then(() => navigate("/"))
  //     .catch((err) => console.warn(err));
  // }, []);
  return <div>Logging out...</div>;
};

export default Logout;
