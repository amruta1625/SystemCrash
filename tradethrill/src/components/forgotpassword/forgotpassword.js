import React from 'react'
import forgotpasswordpage from './forgotpasswordpage.png';
import logotradethrill from '../../logotradethrill.svg';
import './forgotpassword.css';


const ForgotPassword = () => {

  const backgroundStyle = {
    backgroundImage: `url(${forgotpasswordpage})`,
    backgroundSize: 'cover', // Adjust this based on your preference
    height: '100vh', // Set the desired height
    //Add other background-related styles as needed
  };

  return (
          <div className="forgotpassword">
            <div className="backgroundimg">
              <img className='img' src={forgotpasswordpage} alt='forgotpasswordimg'/>
            </div>
            <div className='logoimg'>
              <img className='logo' src={logotradethrill} alt='TradeThrill'/>
              <h1 className='logoname'>Trade Thrill</h1>
            </div>
            <div className='forgotpasswordcontent'>
              <h1>Forgot Password</h1>
              
              <form>
                <div className="form-group">
                  {/* <label htmlFor="email">Email address</label> */}
                  <p>Enter Email:</p>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                  {/* <label htmlFor="password">Password</label> */}
                  <p>OTP:</p>
                  <input type="password" className="form-control" id="password" placeholder="Enter OTP"/>
                </div>
                <div>
                  <button className='submit'>Verify</button>
                </div>
                
              </form>
            </div>
            
          </div>
        
    
  )
}

export default ForgotPassword