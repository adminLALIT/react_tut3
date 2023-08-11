import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { context } from "../component/Contextapi";


const useAuth = () => {
  const {setUser,user} = useContext(context);
  const navigate = useNavigate();
  // const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      if (res) {
        setUser({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          isAdmin: res.data.isAdmin,
          suspended: res.data.suspended,
        });
        setIsLoggedIn(true);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const registerAndLogin = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/create", data);
      if (res.data.success) {
        const userData = res.data.data;
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          isAdmin: userData.isAdmin,
          suspended: userData.suspended,
        });
        setIsLoggedIn(true);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login");
      if (res) {
        setUser({});
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return { user, isLoggedIn, registerAndLogin, login, logout };
};

export default useAuth;
