import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { context } from "./Contextapi";

const Navbar = () => {
  const { user, isLoggedIn } = useContext(context);
  console.log(user);
  let initials = "";
  if (user.id) {
    const userName = user.name.split(" ");
    initials = `${userName[0][0]}${userName[1][0]}`;
  }
  return (
    <nav className="nav">
      <NavLink activeClassName="active" to={"/"} className={"site-title"}>
        Dashboard
      </NavLink>
      <ul>
        <li>
          <NavLink activeClassName="active" to={"/about"}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={"/contact"}>
            Contact
          </NavLink>
        </li>
        {user.id ? (
          <li>
            <div className=" dropdown">
              {user.image ? (<img className="profile" src={user.image}/>) : (<button className="profile">{initials}</button>)}
              <div className="dropdown-options">
                <NavLink activeClassName="active" to={"/profile"}>
                  Profile
                </NavLink>
                <NavLink activeClassName="active" to={"/logout"}>
                  Logout
                </NavLink>
              </div>
            </div>
          </li>
        ) : (
          <>
            <li>
              <NavLink activeClassName="active" to={"/register"}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={"/login"}>
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
