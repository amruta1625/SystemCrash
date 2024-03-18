import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/navbar';
import "./changepassword.css"; 
import AuthContext from '../../../context/AuthProvider';

const ChangePassword = () => {
  const {authCreds, setAuthCreds} = useContext(AuthContext);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleSendOTP = async () => {
    try {

      const response = await axios.post('your-send-otp-api-endpoint', {  });
      setMessage(response.data.message);
      setOtpSent(true);
      setError('');
    } catch (error) {
      setMessage('');
      setError('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('your-verify-otp-api-endpoint', {  otp });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setMessage('');
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="xyz forgot-password-container">
          <h2>Forgot Password</h2>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}
          {!otpSent ? (
            <div>
              <label>User ID:</label>
              <input
                type="number"
                value= {authCreds.user_id}
                readOnly // Make the email field read-only if you want to prevent users from changing it
              />
              <button onClick={handleSendOTP}>Send OTP</button>
            </div>
          ) : (
            <div>
              <label>OTP:</label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={handleVerifyOTP}>Verify OTP</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
