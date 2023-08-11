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

function App() {
  const [data, setData] = useState({});
  // const [user, setUser] = useState({});
  // const {user, setUser} = useAuth();
  
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
