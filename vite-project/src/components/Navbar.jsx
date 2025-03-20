import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the login status from localStorage
    localStorage.removeItem('isLoggedIn');
    navigate('/login'); // Redirect user to the login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src = "https://as1.ftcdn.net/v2/jpg/02/81/66/10/1000_F_281661004_3Zj7ojB3mwAPB2NXBqOWDrwskk5LvFIp.jpg" className='logo-size'/>
      </div>
      <ul className="navbar-links">
        <li>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
