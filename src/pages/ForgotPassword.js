import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  const forgotPass = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`http://127.0.0.1:8080/api/auth/public/forgot-password?email=${encodeURIComponent(email)}`);
        console.log("email send");

    } catch (e) {
      console.log(e);
    }
  };

  const Back = () => {
    navigate("/")
  }

  return (
    <div className="max-w-lg max-h-full mx-auto mt-96 p-6 bg-white shadow-2xl rounded-lg">
      <h1 className=" text-center text-2xl font-semibold mb-4"> Reset Your Password </h1>
      <h2 className="text-xl font-semibold mb-4">Enter Your Email</h2>
      <form onSubmit={forgotPass}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@mail.com"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
      <button 
      className=" mt-5 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      onClick={Back}
      >
        Back
      </button>
    </div>
  );
}

export default ForgotPassword;
