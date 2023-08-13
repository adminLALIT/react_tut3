import React, { useContext } from "react";
import { context } from "./Contextapi";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, access }) => {
  const { user } = useContext(context);
  if (access === "non-authenticated") {
    if (!user) {
      return children;
    }
  } else if (access === "authenticated") {
    if (user) {
      return children;
    }
  }
  return <Navigate to="/"></Navigate>;
};

export default ProtectedRoute;
