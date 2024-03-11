// Navbar.js
import React from 'react';
import logotradethrill from '../../logotradethrill.svg';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneRounded';
import ProfileIcon from '@mui/icons-material/AccountCircleRounded';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './navigationbar.css'; // Import the navbar.css file

const Navbar = () => {
  const navigate = useNavigate();

  const goToSellPage = () => {
    // Use navigate function to navigate to the SellPage component
    navigate('/sellpage');  // Replace '/sell' with the actual path to your SellPage
  };

  const goToNotificationPage = () => {
    // Use navigate function to navigate to the SellPage component
    navigate('/notifications');  // Replace '/sell' with the actual path to your SellPage
  };

  const goToProfilePage = () => {
    // Use navigate function to navigate to the SellPage component
    navigate('/profilepage');  // Replace '/sell' with the actual path to your SellPage
  };

  return (
    <div className="navbar">
      <img src={logotradethrill} alt="logo" className="navbar-logo" />
      <div className="navbar-logo-name">TradeThrill</div>
      <div className="search-container">
        <Input
          className="searchbar"
          type="text"
          placeholder="Search for items"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon className="search-icon" />
            </InputAdornment>
          }
        />
      </div>
      <button className="navbar-button" onClick={goToSellPage}>
        +SELL
      </button>
      <button className="navbar-button">+CHAT</button>
      <NotificationsIcon className="navbar-icon" onClick={goToNotificationPage}/>
      <ProfileIcon className="navbar-icon"  onClick={goToProfilePage}/>
    </div>
  );
};

export default Navbar;
