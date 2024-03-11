import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <>
     <nav>
    <input type="checkbox" id="check"/>
    <label htmlFor="check" className="checkbtn">
      <i className="fas fa-bars"></i>
    </label>
   <div className='logopic'></div>
    <label className="logo">Trade Thrill</label>
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