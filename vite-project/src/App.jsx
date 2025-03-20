
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Chatbot from './components/chatbot';
import NotFound from './components/NotFound'; // Import the NotFound component

// A function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// ProtectedRoute component that checks login status
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

// Redirect to chatbot if already logged in
const RedirectToChatbot = () => {
  return isAuthenticated() ? <Navigate to="/chatbot" /> : <Home />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* If user is logged in, redirect to Chatbot */}
        <Route path="/" element={<RedirectToChatbot />} />

        {/* Login and Signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Chatbot page, protected route */}
        <Route path="/chatbot" element={<ProtectedRoute element={<Chatbot />} />} />

        {/* Catch all other routes */}
        <Route path="*" element={<NotFound />} /> {/* Handle undefined routes */}
      </Routes>
    </Router>
  );
}

export default App;
