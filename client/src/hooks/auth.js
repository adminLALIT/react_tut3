import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { context } from "../component/Contextapi";

const useAuth = () => {
  const { user } = useContext(context);
  const navigate = useNavigate();
  // const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  axios.defaults.withCredentials = true;

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      if (res) {
        setIsLoggedIn(true);
        window.localStorage.setItem("token", res.data.accessToken);
        window.localStorage.setItem("refToken", res.data.refreshToken);
        window.localStorage.setItem("isLoggedIn", true);
        window.localStorage.setItem("userId", res.data.id);
        window.localStorage.setItem("username", res.data.name);
        window.localStorage.setItem("email", res.data.email);
        window.localStorage.setItem("phone", res.data.phone);
        window.localStorage.setItem("isAdmin", res.data.isAdmin);
        // setUser({
        //   id: window.localStorage.getItem("userId"),
        //   name: window.localStorage.getItem("username"),
        //   email: window.localStorage.getItem("email"),
        //   phone: window.localStorage.getItem("phone"),
        //   isAdmin: window.localStorage.getItem("isAdmin"),
        // suspended: res.data.suspended,
        // });
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
        // setUser({
        //   id: window.localStorage.getItem("userId"),
        //   name: window.localStorage.getItem("username"),
        //   email: window.localStorage.getItem("email"),
        //   phone: window.localStorage.getItem("phone"),
        //   isAdmin: window.localStorage.getItem("isAdmin"),
        //   suspended: res.data.suspended,
        // });
        setIsLoggedIn(true);
        window.localStorage.setItem("token", res.data.accessToken);
        window.localStorage.setItem("isLoggedIn", true);
        window.localStorage.setItem("userId", userData.id);
        window.localStorage.setItem("username", userData.name);
        window.localStorage.setItem("email", userData.email);
        window.localStorage.setItem("isAdmin", userData.isAdmin);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/refresh", {
        token: window.localStorage.getItem("refToken"),
      });
      // setUser({
      //   ...user,
      //   accessToken: res.data.accessToken,
      //   refreshToken: res.data.refreshToken,
      // });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  if (user.id) {
    axios.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (user) {
          const decodedToken = jwt_decode(window.localStorage.getItem("token"));
          if (decodedToken * 1000 < currentDate.getTime()) {
            const data = await refreshToken();
            console.log(data);
            config.headers["authorization"] = "Bearer " + data.accessToken;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }
  // console.log(jwt_decode(user.accessToken));

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/logout", {
        // token: user.accessToken,
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      });
      if (res) {
        // setUser({});
        setIsLoggedIn(false);
        window.localStorage.clear();

        navigate("/");
        return true;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  return { user, isLoggedIn, registerAndLogin, login, logout };
};

export default useAuth;
