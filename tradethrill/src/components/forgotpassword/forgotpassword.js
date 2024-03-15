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
    passwordsMatch: true, // New state for passwords match error
  });

  const [step, setStep] = useState(1); // 1: Roll Number, 2: New Password, 3: OTP

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Reset passwords match error when user types in new password or confirm password
    setError((prevError) => ({
      ...prevError,
      passwordsMatch: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      handleRollNumberStep();
    } else if (step === 2) {
      handleNewPasswordStep();
    } else {
      handleVerifyOTPStep();
    }
  };

  const handleRollNumberStep = () => {
    const { rollno } = user;

    if (rollno === '') {
      setError({ ...error, rollnoEmpty: true });
      return;
    }

    setStep(2); // Move to New Password input step
  };

  const handleNewPasswordStep = () => {
    const { newPassword, confirmPassword } = user;

    if (newPassword === '' || confirmPassword === '') {
      setError({
        ...error,
        newPasswordEmpty: newPassword === '',
        confirmPasswordEmpty: confirmPassword === '',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setError({ ...error, passwordsMatch: false });
      return;
    }

    setStep(3); // Move to OTP input step
  };

  const handleVerifyOTPStep = () => {
    const { otp } = user;

    if (otp === '') {
      setError({ ...error, otpEmpty: true });
      return;
    }

    // Implement your verification logic here, e.g., make an API call
    console.log('Verifying OTP:', user);

    // Reset state after OTP verification
    setUser({
      rollno: '',
      newPassword: '',
      confirmPassword: '',
      otp: '',
    });

    setStep(1); // Move back to Roll Number input step
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
          )}

          {step === 2 && (
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
                  className={`form-control ${error.confirmPasswordEmpty || !error.passwordsMatch ? 'error' : ''}`}
                  placeholder="Confirm new password"
                />
                {error.confirmPasswordEmpty && <p className="error-message">Confirm Password is required</p>}
                {!error.confirmPasswordEmpty && !error.passwordsMatch && <p className="error-message">Passwords don't match</p>}
              </div>
            </>
          )}

          {step === 3 && (
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

          <div>
            <button type="submit" className="submit">
              {step === 1 ? 'Next' : 'Verify OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
