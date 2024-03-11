import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/navbar';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    try {
      // Basic validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError('All fields are required');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('New password and confirm password do not match');
        return;
      }

      // Make an API request to change the password
      const response = await axios.post('your-change-password-api-endpoint', {
        currentPassword,
        newPassword,
      });

      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setMessage('');
      setError('Error changing password. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="xyz change-password-container">
          <h2>Change Password</h2>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}
          <div>
            <div>
              <label>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button onClick={handleChangePassword}>Change Password</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
