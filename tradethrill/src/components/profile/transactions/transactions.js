import React from 'react'
import Navbar from '../Navbar/navbar'
import './transactions.css'

export default function Transactions() {
  return (
    <>
    <Navbar trans = "active" />
     <section>
      <p className="heading">Your Transactions</p>
      <div className="rm">
        <div className="kd">
          <img src="heater.png" alt="item"/>
        </div>
        <div className="lib">
          <p style={{marginBottom: '5px'}}>Handbag</p>
          <p>description:</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, architecto.</p>
        </div>
      </div>
    </section>
    </>
  )
}