import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/">Login</Link>
      <Link to="/users">View Users</Link>
    </div>
  );
};

export default NavBar;
