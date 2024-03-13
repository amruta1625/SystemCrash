import React, { useState } from "react";
import createaccount from './createaccount.png';
import axios from "axios";
import './register.css';
import logotradethrill from '../../logotradethrill.svg';
import { Link } from 'react-router-dom';

const Register = () => {
  const userEmailRegex = /^$|^[a-z0-9.]+@[a-z0-9]+\.iitk\.ac\.in$|^[a-z0-9.]+@iitk\.ac\.in$/;

  
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    reEnterPassword: "",
  });

  const [error, setError] = useState({
    nameEmpty: false,
    emailEmpty: false,
    usernameEmpty: false,
    passwordEmpty: false,
    emailInvalid: false,
    emailUsed: false,
    passwordDoesntMatch: false
  });

  const [registrationStage, setStage] = useState("not yet submitted");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;

    let emptyKeys = {};
    for (const key of Object.keys(user)) {
      if (user[key] === "") {
        emptyKeys[key + "Empty"] = true;
      }
    }

    setError({ ...error, ...emptyKeys });
    if (Object.keys(emptyKeys).length > 0) return;

    if (password !== reEnterPassword) {
      setError({ ...error, passwordDoesntMatch: true });
      return;
    }

    if (!userEmailRegex.test(email)) {
      setError({ ...error, emailInvalid: true });
      return;
    }

    if (password === reEnterPassword) {
      setStage("pending");
      axios.post("http://127.0.0.1:8000/register", user).then((res) => {
        if (res.data.message === "A user already registered with the same Email") {
          setError({ ...error, emailUsed: true });
          setStage("not yet submitted");
          return;
        } else if (res.data.message === "Successfully Registered, Please login now.") {
          setStage("completed");
        }
      });
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${createaccount})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <>
      <div className="register">
        <div className="background-container" style={backgroundStyle}>
          <div className="logo-container">
             <img src={logotradethrill} alt="logo" className="logotradethrill" /> 
            <h2 className="logo-name">TradeThrill</h2>
          </div>
          <div className="create">
            <h1 className="createstatement">
              Create new <br /> Account
            </h1>
            <h1 className="loginpage">
              Already registered ? <Link to="/login">Login</Link>
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <h3 className="NameStatement">Please enter your name</h3>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className={`inputName ${error.nameEmpty ? "error" : ""}`}
                />
              </div>
              <div className="input-container">
                <h3 className="NameStatement">Please enter Email</h3>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter Your Roll Number"
                  className={`inputName ${error.emailEmpty || error.emailInvalid || error.emailUsed ? "error" : ""}`}
                />
                {error.emailEmpty && <p className="error-message">Email is required</p>}
                {error.emailInvalid && <p className="error-message">Invalid Email format</p>}
                {error.emailUsed && <p className="error-message">Email is already registered</p>}
              </div>
              {/* Add other input fields for username, password, etc. */}
              <div className="input-container">
                <h3 className="NameStatement">Please enter password</h3>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className={`inputName ${error.passwordEmpty ? "error" : ""}`}
                />
                {error.passwordEmpty && <p className="error-message">Password is required</p>}
              </div>
              <div className="input-container">
                <h3 className="NameStatement">Confirm Password</h3>
                <input
                  type="password"
                  name="reEnterPassword"
                  value={user.reEnterPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`inputName ${error.passwordDoesntMatch ? "error" : ""}`}
                />
                {error.passwordDoesntMatch && <p className="error-message">Passwords do not match</p>}
              </div>
              <button className="button" type="submit">
                {registrationStage === "pending" ? "Loading" : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
