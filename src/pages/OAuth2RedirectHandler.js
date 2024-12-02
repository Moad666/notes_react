import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OAuth2RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      // Send the code to the backend to exchange for a token
      axios
        .post("/api/oauth/token", { code })
        .then((response) => {
          // Assuming the response contains the access token
          const { token } = response.data;
          
          // Store the token in localStorage
          localStorage.setItem("access_token", token);
          console.log("OAuth2 Token received and stored");

          // Redirect to the signup page or another page
          navigate("/signup");
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
        });
    } else {
      console.error("No code found in redirect");
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
}

export default OAuth2RedirectHandler;
