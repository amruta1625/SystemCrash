import React, { useState } from 'react';
import login from './login.png';
import logotradethrill from '../../logotradethrill.svg';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    rollno: '',
    password: '',
  });

  const [error, setError] = useState({
    rollnoEmpty: false,
    passwordEmpty: false,
  });

  const backgroundStyle = {
    backgroundImage: `url(${login})`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAction();
  };

  const loginAction = () => {
    const { rollno, password } = user;

    let emptyKeys = {};
    for (const key of Object.keys(user)) {
      if (user[key] === '') {
        emptyKeys[`${key}Empty`] = true;
      }
    }

    setError({ ...error, ...emptyKeys });
    if (Object.keys(emptyKeys).length > 0) return;

    // Implement Axios login request
    axios.post('http://127.0.0.1:8000/login', {
      rollno: rollno,
      password: password
    })
    .then(response => {
      console.log('Login successful:', response.data);
      // Redirect to home page or any other desired route upon successful login
      navigate.push('/home');
    })
    .catch(error => {
      console.error('Login error:', error);
      // Handle login error, such as displaying error message to the user
    });
  };

  return (
    <div className="login">
      <div className="backgroundimg">
        <img className="img" src={login} alt="Loginimg" />
      </div>
      <div className="logoimg">
        <img className="logo" src={logotradethrill} alt="TradeThrill" />
        <h1 className="logoname">Trade Thrill</h1>
      </div>
      <div className="logincontent">
        <h1>Login</h1>
        <h4>
          Don't have an account? <Link to="/register">SignUp</Link>
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <p>Enter Roll Number:</p>
            <input
              type="int" // Change to roll number type
              name="rollno"
              value={user.rollno}
              onChange={handleChange}
              className={`form-control ${error.rollnoEmpty ? 'error' : ''}`}
              placeholder="Enter Roll Number"
            />
            {error.rollnoEmpty && <p className="error-message">Roll Number is required</p>}
          </div>
          <div className="form-group">
            <p>Password:</p>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className={`form-control ${error.passwordEmpty ? 'error' : ''}`}
              placeholder="Enter Password"
            />
            {error.passwordEmpty && <p className="error-message">Password is required</p>}
          </div>
          <div>
            <button type="submit" className="submit">
              Login
            </button>
          </div>
          <p>
            <Link to="/forgotpassword">Forgot Password</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
