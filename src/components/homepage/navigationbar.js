// import React, { useState } from "react";
// import logotradethrill from "../../logotradethrill.svg";
// import NotificationsIcon from "@mui/icons-material/NotificationsNoneRounded";
// import ProfileIcon from "@mui/icons-material/AccountCircleRounded";
// import InputBase from "@mui/material/InputBase";
// import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";
// import "./navigationbar.css";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import axios from "axios";
// import StorefrontIcon from '@mui/icons-material/Storefront';

// const Navbar = ({ search_stuff }) => {
//   const { products, setProducts } = search_stuff;
//   const navigate = useNavigate();
//   const [searchString, setSearchString] = useState("");

//   const goToSellPage = () => {
//     navigate("/sellpage");
//   };

//   const goToChatPage = () => {
//     navigate("/chatpage");
//   };

//   const goToNotificationPage = () => {
//     navigate("/notify");
//   };

//   const goToProfilePage = () => {
//     navigate("/profilepage");
//   };

//   const goToWishlist = () => {
//     navigate("/wishlist"); // Assuming your wishlist page is at this route
//   };

//   const goToUploadedItems = () => {
//     navigate("/uploadeditems");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchString.trim() === "") {
//       axios.get("https://elan.iith-ac.in:8082/get_products")
//         .then((res) => {
//           setProducts(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       axios.post("https://elan.iith-ac.in:8082/search", { query: searchString })
//         .then((res) => {
//           setProducts(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch(e);
//     }
//   };

//   return (
//     <div className="navbar">
//       <img src={logotradethrill} alt="logo" className="navbar-logo" />
//       <div className="navbar-logo-name">TradeThrill</div>
//       <div className="search-container">
//         <InputBase
//           className="searchbar"
//           placeholder="Search for items"
//           value={searchString}
//           onChange={(e) => setSearchString(e.target.value)}
//           onKeyPress={handleKeyPress} // Bind handleKeyPress function to onKeyPress event
//           endAdornment={
//             <InputAdornment position="end">
//               <SearchIcon
//                 className="search-icon"
//                 onClick={(e) => handleSearch(e)}
//               />
//             </InputAdornment>
//           }
//         />
//       </div>
//       <FavoriteBorderIcon className="favoriteicon" onClick={goToWishlist} />
//       <StorefrontIcon className="uploadedicon" onClick={goToUploadedItems} />
//       <button className="navbar-button" onClick={goToSellPage} >
//         SELL
//       </button>
//       <button className="navbar-button" onClick={goToChatPage}>
//         CHAT
//       </button>
//       <NotificationsIcon
//         className="notificationicon"
//         onClick={goToNotificationPage}
//       />
//       <ProfileIcon className="profileicon" onClick={goToProfilePage} />
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import logotradethrill from "../../logotradethrill.svg";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneRounded";
import ProfileIcon from "@mui/icons-material/AccountCircleRounded";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./navigationbar.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import StorefrontIcon from '@mui/icons-material/Storefront';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from "@mui/material";

const Navbar = ({ search_stuff }) => {
  const { products, setProducts } = search_stuff;
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const goToHome = () => {
    try {
      navigate('/home');
    } catch (error) {
      console.error('Error navigating to home:', error);
    }
  };

  const handleMenuItemClick = (route) => {
    setIsMobileMenuOpen(false);
    navigate(route);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchString.trim() === "") {
      axios.get("https://elan.iith-ac.in:8082/get_products")
      // axios.get("http://127.0.0.1:8000/get_products")
      .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post("https://elan.iith-ac.in:8082/search", { query: searchString })
      // axios.post("http://127.0.0.1:8000/search", { query: searchString })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="navbar">
      <img src={logotradethrill} alt="logo" className="navbar-logo" onClick={goToHome}/>
      <div className="navbar-logo-name" onClick={goToHome}>TradeThrill</div>
      <div className="search-container">
        <InputBase
          className="searchbar"
          placeholder="Search for items"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyPress={handleKeyPress}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon
                className="search-icon"
                onClick={handleSearch}
              />
            </InputAdornment>
          }
        />
      </div>
      <div className="menu-toggle" onClick={toggleMobileMenu}>
        <MenuIcon className="menu-icon" />
      </div>
      <div className={`navigation-items ${isMobileMenuOpen ? 'hidden' : ''}`}>
        {/* Render navigation items here */}
        <Tooltip title="Wishlist" placement="bottom">
        <FavoriteBorderIcon className="favoriteicon" onClick={() => handleMenuItemClick("/wishlist")} />
        </Tooltip>
        <Tooltip title="Products on Sale" placement="bottom">
        <StorefrontIcon className="uploadedicon" onClick={() => handleMenuItemClick("/uploadeditems")} />
        </Tooltip>
        <button className="navbar-button" onClick={() => handleMenuItemClick("/sellpage")} >
          SELL
        </button>
        <button className="navbar-button" onClick={() => handleMenuItemClick("/chatpage")}>
          CHAT
        </button>
        <Tooltip title="Notifications" placement="bottom">
        <NotificationsIcon
          className="notificationicon"
          onClick={() => handleMenuItemClick("/notify")}
        />
        </Tooltip>
        <Tooltip title="Profile" placement="bottom">
        <ProfileIcon className="profileicon" onClick={() => handleMenuItemClick("/profilepage")} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
