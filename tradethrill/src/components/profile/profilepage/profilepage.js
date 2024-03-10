import React from 'react'
import './profilepage.css'
import Navbar from '../Navbar/navbar'

export default function ProfilePage() {
  return (
    <>
 <Navbar/>
  <section>  
    <div className="xyz">
      <div className="abc">
        <div id="profile-pic"></div>
      </div>
      <div className="matter">
        <div className="text">
          <div>
            <span className="ar"><pre style={{ display: 'inline-block' }}>NAME           :</pre></span>
            <span id="name" className="br">name</span>
          </div>
          <div>
            <span className="ar"><pre style={{ display: 'inline-block' }}>IITK-EMAIL ID  :</pre></span>
            <span id="email-id" className="br">email_id</span>
          </div>
          <div>
            <span className="ar"><pre style={{ display: 'inline-block' }}>USERNAME       :</pre></span>
            <span id="userName" className="br">user_name</span>
          </div>
        </div>
        <div className="btn">
          <button>Edit Profile</button>
        </div>
      </div>  
    </div>
  </section>

    </>
  )
}