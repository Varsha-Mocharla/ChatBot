// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div> {/* For the background overlay effect */}
      <div className="content">
        <h1 className="welcome-heading">Welcome to our Chatbot Models</h1>
        <p className="welcome-text">Sign up or log in to start chatting with our intelligent bot!</p>
        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn signup-btn">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
