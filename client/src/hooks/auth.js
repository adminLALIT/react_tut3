import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { context } from "../component/Contextapi";

const useAuth = () => {
  const { user, setUser } = useContext(context);
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
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
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

  //   const refreshToken = async () => {
  //     try {
  //       const res = await axios.post("http://localhost:5000/api/refresh", {
  //         token: user.refreshToken,
  //       });
  //       setUser({
  //         ...user,
  //         accessToken: res.data.accessToken,
  //         refreshToken: res.data.refreshToken,
  //       });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   axios.interceptors.request.use(
  //     async (config) => {
  //       const currentDate = new Date();
  //       if (user) {
  //         const decodedToken = jwt_decode(user.accessToken);
  //         if (decodedToken * 1000 < currentDate.getTime()) {
  //           const data = await refreshToken();
  //           console.log(data);
  //           config.headers["authorization"] = "Bearer " + data.accessToken;
  //         }
  //       }
  //       return config;
  //     },
  //     (err) => {
  //       return Promise.reject(err);
  //     }
  //   );
  // console.log(jwt_decode(user.accessToken));

  const logout = async () => {
    console.log(user);
    try {
      const res = await axios.post("http://localhost:5000/api/logout", {
        token: user.accessToken,
        header: { authorization: "Bearer " + user.accessToken },
      });
      if (res) {
        setUser({});
        setIsLoggedIn(false);
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
