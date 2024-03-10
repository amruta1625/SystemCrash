import React, { useState } from 'react'
import './homepage.css';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneRounded';
import logotradethrill from '../../logotradethrill.svg'; 
import ProfileIcon from '@mui/icons-material/AccountCircleRounded';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #F3F1E1 10px),
                      repeating-linear-gradient(#dbcd9d55, #dbcd9d)`,
    width: '100%', // Set width to cover the entire container
    height: '100%', // Set height to cover the entire container
    position: 'fixed', // Fix the position to cover the entire viewport
    top: 0,
    left: 0
  };

  const navigate = useNavigate(); 

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
    //add logic
  };

  const goToSellPage = () => {
    // Use navigate function to navigate to the SellPage component
    navigate('/sellpage');  // Replace '/sell' with the actual path to your SellPage
  };

  
  return (
   <div className="homepage">
      <div  className="background" style={backgroundStyle}>
        <div className="logo-container">
            <img src={logotradethrill} alt="logo" className="logotradethrill"/>
            <h2 className="logo-name">TradeThrill</h2>
            <div className="search-container">
            <Input
              className="searchbar"
              type="text"
              placeholder="Search for items"
              value={searchTerm}
              onChange={handleSearch}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon className="search-icon" />
                </InputAdornment>
              }
            />
          </div>
            <button className="sellicon" onClick={goToSellPage} >
              +SELL
            </button>
          
            <NotificationsIcon className="notificationsicon" />
            <button className="chaticon" >
              +CHAT
            </button>
            <ProfileIcon className="profileicon" />
        </div>
        <h1 className='recomendation'>
        Recent Recomendations
      </h1>
      </div>
      
    </div>
  )
}

export default Home