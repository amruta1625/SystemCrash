import React, { useContext, useState } from 'react';
import login from './login.png';
import logotradethrill from '../../logotradethrill.svg';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const { authCreds, setAuthCreds, setIsLoggedIn } =
    useContext(AuthContext);

  const [user, setUser] = useState({
    user_id: "",
    hashed_password: "",
  });

  const [error, setError] = useState({
    rollnoEmpty: false,
    passwordEmpty: false,
  });

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
    if (user.user_id && user.hashed_password) {
      axios
        .post("https://elan.iith-ac.in:8082/login", user)
        // .post("http://127.0.0.1:8000/login", user)
        .then((res) => {
          // console.log("Response data:", res.data);
          if (res.data.message === "success") {
            setAuthCreds(prevAuthCreds => ({
              ...prevAuthCreds,
              user_id: res.data.user_id,
              name: res.data.name,
              email: res.data.email,
              active: res.data.verified,
              notification: res.data.notifications,
              profile_pic: res.data.photo,
              hashed_password: res.data.hashed_password
            }));
            // console.log(res.data)
            setIsLoggedIn(true);
            if (res.data.verified) {
              navigate("/home");
            } else {
              navigate("/otp");
            }
          } else {
            alert("Invalid Credentials");
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
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
              type="number" // Change to roll number type
              name="user_id"
              value={user.user_id}
              onChange={handleChange}
              className={`form-control ${error.rollnoEmpty ? "error" : ""}`}
              placeholder="Enter Roll Number"
            />
            {error.rollnoEmpty && (
              <p className="error-message">Roll Number is required</p>
            )}
          </div>
          <div className="form-group">
            <p>Password:</p>
            <input
              type="password"
              name="hashed_password"
              value={user.hashed_password}
              onChange={handleChange}
              className={`form-control ${error.passwordEmpty ? "error" : ""}`}
              placeholder="Enter Password"
            />
            {error.passwordEmpty && (
              <p className="error-message">Password is required</p>
            )}
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
