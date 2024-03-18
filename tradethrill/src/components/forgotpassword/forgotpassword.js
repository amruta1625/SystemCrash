import React, { useState } from 'react';
import forgotpasswordpage from './forgotpasswordpage.png';
import logotradethrill from '../../logotradethrill.svg';
import './forgotpassword.css';
import axios from 'axios'; // Import Axios for making HTTP requests

const ForgotPassword = () => {
  const [user, setUser] = useState({
    user_id: 0,
    new_password: '',
    confirm_password: '',
    // otp: '',
  });

  const [error, setError] = useState({
    rollnoEmpty: false,
    newPasswordEmpty: false,
    confirmPasswordEmpty: false,
    otpEmpty: false,
    passwordsMatch: true,
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      passwordsMatch: true,
    }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/forgotpassword', user);
      console.log(response.data); 
      setStep(2); 
    } 
    catch (error) {
      console.error(error); // Handle error
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/newotp', user);
      console.log(response.data); 
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <div className="forgotpassword">
      <div className="backgroundimg">
        <img className="img" src={forgotpasswordpage} alt="ForgotPasswordimg" />
      </div>
      <div className="logoimg">
        <img className="logo" src={logotradethrill} alt="TradeThrill" />
        <h1 className="logoname">Trade Thrill</h1>
      </div>
      <div className="forgotpasswordcontent">
        <h1>Forgot Password</h1>

        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="form-group">
              <p>Enter Roll Number:</p>
              <input
                type="text"
                name="user_id"
                value={user.user_id}
                onChange={handleChange}
                className={`form-control ${error.rollnoEmpty ? 'error' : ''}`}
                placeholder="Enter Roll Number"
              />
              {error.rollnoEmpty && <p className="error-message">Roll Number is required</p>}
            </div>

            <div className="form-group">
              <p>New Password:</p>
              <input
                type="password"
                name="new_password"
                value={user.new_password}
                onChange={handleChange}
                className={`form-control ${error.newPasswordEmpty || !error.passwordsMatch ? 'error' : ''}`}
                placeholder="Enter new password"
              />
              {error.newPasswordEmpty && <p className="error-message">New Password is required</p>}
            </div>

            <div className="form-group">
              <p>Confirm Password:</p>
              <input
                type="password"
                name="confirm_password"
                value={user.confirm_password}
                onChange={handleChange}
                className={`form-control ${error.confirmPasswordEmpty || !error.passwordsMatch ? 'error' : ''}`}
                placeholder="Confirm new password"
              />
              {error.confirmPasswordEmpty && <p className="error-message">Confirm Password is required</p>}
              {!error.confirmPasswordEmpty && !error.passwordsMatch && <p className="error-message">Passwords don't match</p>}
            </div>

            <div className="button-container">
              <button type="submit" className="submit">Send OTP</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div className="form-group">
              <p>Enter OTP:</p>
              <input
                type="text"
                name="otp"
                value={user.otp}
                onChange={handleChange}
                className={`form-control ${error.otpEmpty ? 'error' : ''}`}
                placeholder="Enter OTP"
              />
              {error.otpEmpty && <p className="error-message">OTP is required</p>}
            </div>

            <div className="button-container">
              <button type="submit" className="submit">Verify OTP</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
