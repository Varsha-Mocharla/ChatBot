import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarNotFound.css';

const NavbarNotFound = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src = "https://as1.ftcdn.net/v2/jpg/02/81/66/10/1000_F_281661004_3Zj7ojB3mwAPB2NXBqOWDrwskk5LvFIp.jpg" className='logo-size'/>
      </div>
      <ul className="navbar-links">
        <li>
        <Link to="/" className="btn login-btn">Go to Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarNotFound;
