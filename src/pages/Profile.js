import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  //const { currentUser, token } = useContext();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const[loginSession, setLoginSession] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetch2FAStatus = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/auth/public/user/2fa-status`, {
            headers: {
                Authorization: `Bearer ${token}`,
              }
          }
        );
        setIs2FAEnabled(response.data.is2faEnabled);
        
      } catch (e) {
        console.log(e);
      }
    };
    fetch2FAStatus();
  }, [token]);

  const enable2FA = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/auth/public/enable-2fa",{}, {
            
            headers: {
                Authorization: `Bearer ${token}`,
              }
        }
      );
      setQrCodeUrl(response.data);
      setStep(2);
    } catch (e) {
      console.log(e);
    }
  };

  const disable2FA = async () => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8080/api/auth/public/disable-2fa", {},{            
            headers: {
                Authorization: `Bearer ${token}`,
              }
        }
      );
      setIs2FAEnabled(false);
      setQrCodeUrl("");
    } catch (e) {
      console.log(e);
    }
  };

  const verify2FA = async () => {
    if (!code || code.trim().length === 0) {
      console.log("please enter the code to verify");
    }

    try {
        const token = localStorage.getItem("token");
      const formData = new URLSearchParams();
      formData.append("code", code);

      await axios.post(`http://127.0.0.1:8080/api/auth/public/verify-2fa`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      setIs2FAEnabled(true);
      setStep(1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-10 text-center">
      {/* Button dynamically changes color and label */}
      <button
        onClick={is2FAEnabled ? disable2FA : enable2FA}
        className={`text-white font-bold rounded-full w-40 px-4 py-2 ${
          is2FAEnabled
            ? "bg-green-500 hover:bg-green-700"
            : "bg-red-500 hover:bg-red-700"
        }`}
      >
        {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
      </button>

      {step === 2 && qrCodeUrl && (
        <div className="mt-5">
          <p>Scan this QR Code with your 2FA app:</p>
          <img src={qrCodeUrl} alt="QR Code for 2FA" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 2FA code"
            className="mt-4 p-2 border rounded"
          />
          <button
            onClick={verify2FA}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Verify 2FA
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
