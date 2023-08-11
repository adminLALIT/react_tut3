import React, { useEffect, useState } from "react";
import useAuth from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate;

  const handleLogout = async () => {
    const isLoggedOut = await logout();
    if (isLoggedOut) {
      navigate("/register");
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
