import login from './login.png';
import logotradethrill from '../../logotradethrill.svg';
import './login.css';

import { Link } from 'react-router-dom';
// import { useState } from 'react';


const Login = () => {

    const backgroundStyle = {
      backgroundImage: `url(${login})`,
      backgroundSize: 'cover', // Adjust this based on your preference
      height: '100vh', // Set the desired height
      //Add other background-related styles as needed
    };
    
  
    return (
      <div className="login">
        <div className="backgroundimg">
          <img className='img' src={login} alt='Loginimg'/>
        </div>
        <div className='logoimg'>
          <img className='logo' src={logotradethrill} alt='TradeThrill'/>
          <h1 className='logoname'>Trade Thrill</h1>
        </div>
        <div className='logincontent'>
          <h1>Login</h1>
          <h4>Don't have an account? <Link to="/register">SignUp</Link></h4>
          <form>
            <div className="form-group">
              {/* <label htmlFor="email">Email address</label> */}
              <p>Enter Email:</p>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              {/* <label htmlFor="password">Password</label> */}
              <p>Password:</p>
              <input type="password" className="form-control" id="password" placeholder="Enter Password"/>
            </div>
            <div>
              <button className='submit'>Login</button>
            </div>
            <p><Link to='/forgotpassword'>Forgot Password</Link></p>
          </form>
        </div>
      </div>
    );
  };

  export default Login;

