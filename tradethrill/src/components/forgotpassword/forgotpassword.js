import React, { useState } from 'react';
import forgotpasswordpage from './forgotpasswordpage.png';
import logotradethrill from '../../logotradethrill.svg';
import './forgotpassword.css';

const ForgotPassword = () => {
  const [user, setUser] = useState({
    rollno: '',
    newPassword: '',
    confirmPassword: '',
    otp: '',
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

  const handleSendOTP = (e) => {
    e.preventDefault();

    const { rollno, newPassword, confirmPassword } = user;

    if (rollno === '' || newPassword === '' || confirmPassword === '') {
      setError({
        rollnoEmpty: rollno === '',
        newPasswordEmpty: newPassword === '',
        confirmPasswordEmpty: confirmPassword === '',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setError({ ...error, passwordsMatch: false });
      return;
    }

    console.log('Sending OTP:', user);

    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    const { otp } = user;

    if (otp === '') {
      setError({ ...error, otpEmpty: true });
      return;
    }

    console.log('Verifying OTP:', user);

    setUser({
      rollno: '',
      newPassword: '',
      confirmPassword: '',
      otp: '',
    });

    // Redirect or display success message after OTP verification
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
                name="rollno"
                value={user.rollno}
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
                name="newPassword"
                value={user.newPassword}
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
                name="confirmPassword"
                value={user.confirmPassword}
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
