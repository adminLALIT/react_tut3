import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Register from "./component/Register";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Profile from "./component/Profile";
import useAuth from "./hooks/auth";
import Logout from "./component/Logout";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  const [data, setData] = useState({});
  // const [user, setUser] = useState({});
  // const {user, setUser} = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/register"
            element={
              // <ProtectedRoute access="non-authenticated">
                <Register />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              // <ProtectedRoute access="non-authenticated">
                <Login />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              // <ProtectedRoute access="authenticated">
                <Profile />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              // <ProtectedRoute access="authenticated">
                <Logout />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
