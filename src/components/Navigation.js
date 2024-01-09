// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import CSS

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Performance" className="nav-link">
            Performance
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Map" className="nav-link">
            Map
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Logout" className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
