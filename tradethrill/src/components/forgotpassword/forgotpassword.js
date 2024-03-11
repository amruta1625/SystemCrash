import React, { useState } from 'react';
import forgotpasswordpage from './forgotpasswordpage.png';
import logotradethrill from '../../logotradethrill.svg';
import './forgotpassword.css';

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    emailEmpty: false,
    otpEmpty: false,
    newPasswordEmpty: false,
    confirmPasswordEmpty: false,
  });

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password

  const backgroundStyle = {
    backgroundImage: `url(${forgotpasswordpage})`,
    backgroundSize: 'cover', // Adjust this based on your preference
    height: '100vh', // Set the desired height
    // Add other background-related styles as needed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSendOTP = () => {
    // Implement your logic to send OTP (e.g., make an API call)
    setStep(2); // Move to the next step (OTP input)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 2) {
      // If the current step is OTP, verify the OTP
      verifyAction();
    } else if (step === 3) {
      // If the current step is New Password, update the password
      updatePassword();
    } else {
      // If the current step is Email, move to the next step (OTP input)
      handleSendOTP();
    }
  };

  const verifyAction = () => {
    const { otp } = user;

    let emptyKeys = {};
    for (const key of Object.keys(user)) {
      if (user[key] === '' && key !== 'newPassword' && key !== 'confirmPassword') {
        emptyKeys[`${key}Empty`] = true;
      }
    }

    setError({ ...error, ...emptyKeys });
    if (Object.keys(emptyKeys).length > 0) return;

    // Implement your verification logic here, e.g., make an API call
    console.log('Verifying:', user);

    // Assume verification is successful for demonstration purposes
    setStep(3); // Move to the next step (New Password input)
  };

  const updatePassword = () => {
    const { newPassword, confirmPassword } = user;

    let emptyKeys = {};
    for (const key of Object.keys(user)) {
      if (user[key] === '' && key !== 'otp') {
        emptyKeys[`${key}Empty`] = true;
      }
    }

    setError({ ...error, ...emptyKeys });
    if (Object.keys(emptyKeys).length > 0) return;

    // Implement your logic to update the password (e.g., make an API call)
    console.log('Updating password:', user);

    // Reset state after password change
    setUser({
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    });

    setStep(1); // Move back to the first step (Email input)
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

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-group">
              <p>Enter Email:</p>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className={`form-control ${error.emailEmpty ? 'error' : ''}`}
                placeholder="Enter email"
              />
              {error.emailEmpty && <p className="error-message">Email is required</p>}
            </div>
          )}

          {step === 2 && (
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
            )}
  
            {step === 3 && (
              <>
                <div className="form-group">
                  <p>New Password:</p>
                  <input
                    type="password"
                    name="newPassword"
                    value={user.newPassword}
                    onChange={handleChange}
                    className={`form-control ${error.newPasswordEmpty ? 'error' : ''}`}
                    placeholder="Enter new password"
                  />
                  {error.newPasswordEmpty && <p className="error-message">New Password is required</p>}
                </div>
                <div className="form-group">
                  <p>Confirm Password:</p>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    className={`form-control ${error.confirmPasswordEmpty ? 'error' : ''}`}
                    placeholder="Confirm new password"
                  />
                  {error.confirmPasswordEmpty && (
                    <p className="error-message">Confirm Password is required</p>
                  )}
                </div>
              </>
            )}
  
            <div>
              <button type="submit" className="submit">
                {step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default ForgotPassword;  