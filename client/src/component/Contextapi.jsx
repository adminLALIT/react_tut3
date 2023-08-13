import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const context = createContext();

const Contextapi = ({ children }) => {
  const [user, setUser] = useState({});
  const userId = window.localStorage.getItem("userId");
  const name = window.localStorage.getItem("username");
  const phone = window.localStorage.getItem("phone");
  const email = window.localStorage.getItem("email");
  const isAdmin = window.localStorage.getItem("isAdmin");
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const image = window.localStorage.getItem('image');
  useEffect(() => {
    setUser({ id: userId, name: name, phone, email, isAdmin, image: image });
  }, [isLoggedIn]);
  return (
    <context.Provider value={{ user, isLoggedIn }}>{children}</context.Provider>
  );
};

export default Contextapi;
