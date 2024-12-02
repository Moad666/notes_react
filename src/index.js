import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/oauth2/redirect",
    element: <OAuth2RedirectHandler />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },



]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />

);
