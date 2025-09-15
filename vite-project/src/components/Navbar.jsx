import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Giakanja Admin</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/assignments">Assignments</Link>
        <Link to="/events">Events</Link>
        <Link to="/gallery">Gallery</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
