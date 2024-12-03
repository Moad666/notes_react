import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct named import

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decoding the JWT token
      const expirationTime = decodedToken.exp * 1000; // Convert expiration to milliseconds
      if (Date.now() < expirationTime) {
        isAuthenticated = true; // Token is valid
      } else {
        localStorage.removeItem('token'); // Token expired, remove it
      }
    } catch (e) {
      console.error("Invalid token:", e);
      localStorage.removeItem('token'); // Invalid token, remove it
    }
  }

  // If authenticated, render the children (Profile page), otherwise redirect to login page
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
