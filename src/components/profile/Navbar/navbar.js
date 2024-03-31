import React, { useContext } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logotradethrill from '../../../logotradethrill.svg';
import AuthContext from '../../../context/AuthProvider';

export default function Navbar(props) {
  const navigate = useNavigate();
  const { setAuthCreds, setIsLoggedIn } = useContext(AuthContext);

  const goToHome = () => {
    try {
      navigate('/home');
    } catch (error) {
      console.error('Error navigating to home:', error);
    }
  };

  const handleLogout = () => {
    setAuthCreds({
      user_id: 0,
      name: '',
      email: '',
      active: 0,
      profile_pic: '',
      notifications: [],
      hashed_password: '',
    });
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>

        <img className="logopic" src={logotradethrill} alt="TradeThrill" />

        <label className="logo" onClick={goToHome}>TradeThrill</label>
        <ul>
          <li>
            <Link className={props.vp} to="/profilepage">
              View Profile
            </Link>
          </li>
          <li>
            <Link className={props.trans} to="/transactions">
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/changepassword">Change Password</Link>
          </li>
          <li>
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}