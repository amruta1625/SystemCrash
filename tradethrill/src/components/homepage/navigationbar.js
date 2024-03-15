import React from 'react';
import logotradethrill from '../../logotradethrill.svg';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneRounded';
import ProfileIcon from '@mui/icons-material/AccountCircleRounded';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './navigationbar.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Navbar = () => {
  const navigate = useNavigate();

  const goToSellPage = () => {
    navigate('/sellpage');
  };

  const goToChatPage = () => {
    navigate('/chatpage');
  };

  const goToNotificationPage = () => {
    navigate('/notify');
  };

  const goToProfilePage = () => {
    navigate('/profilepage');
  };

  const goToWishlist = () => {
    navigate('/wishlist'); // Assuming your wishlist page is at this route
  };

  return (
    <div className="navbar">
      <img src={logotradethrill} alt="logo" className="navbar-logo" />
      <div className="navbar-logo-name">TradeThrill</div>
      <div className="search-container">
        <InputBase
          className="searchbar"
          placeholder="Search for items"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon className="search-icon" />
            </InputAdornment>
          }
        />
      </div>
      <FavoriteBorderIcon className="favoriteicon" onClick={goToWishlist} />
      <button className="navbar-button" onClick={goToSellPage}>
        +SELL
      </button>
      <button className="navbar-button" onClick={goToChatPage}>
        +CHAT
      </button>
      <NotificationsIcon className="notificationicon" onClick={goToNotificationPage} />
      <ProfileIcon className="profileicon" onClick={goToProfilePage} />
    </div>
  );
};

export default Navbar;
