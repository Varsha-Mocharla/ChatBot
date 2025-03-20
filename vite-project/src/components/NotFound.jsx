// src/components/NotFound.jsx
import React from 'react';
import NavbarNotFound from './NavbarNotFound';
import './NotFound.css'; // Import CSS for styling

const NotFound = () => {
  return (
    <>
        <NavbarNotFound />
        <div className="not-found">
        <h1>Oops... We did not have that!</h1>
        <img
            src="https://www.shutterstock.com/image-vector/404-error-page-not-foundcute-260nw-2448068415.jpg"
            alt="Not Found"
        />
        </div>
    </>
  );
};

export default NotFound;
