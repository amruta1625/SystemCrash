import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import logotradethrill from '../../../logotradethrill.svg';

export default function Navbar(props) {
  return (
    <>
     <nav>
    <input type="checkbox" id="check"/>
    <label htmlFor="check" className="checkbtn">
      <i className="fas fa-bars"></i>
    </label>
   <div className='logopic'>
   {/* <img className="logo" src={logotradethrill} alt="TradeThrill" /> */}
   </div>
     
    <label className="logo">TradeThrill</label>
    <ul>
      <li><Link  className= {props.vp}  to = "/profilepage">View Profile</Link></li>
      <li><Link  className= {props.trans} to = "/transactions">Transactions</Link></li>
      <li><Link to ="/changepassword">Change Password</Link></li>
      <li><Link to ="/">Logout</Link></li>
    </ul>
  </nav>
    </>
  )
}