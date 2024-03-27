import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]);
  const { authCreds } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://elan.iith-ac.in:8082/get_wishlist/${authCreds.user_id}`)
      // .get(`http://127.0.0.1:8000/get_wishlist/${authCreds.user_id}`)
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, [authCreds.user_id]);


  return (
    <>
      {/* <Navbar wishlist="active" /> */}
      <div className="content-container">
        <h1 className="heading">Your Wishlist</h1>
        {/* <section className="wishlist-section">
          <div className="wishlist-container"> */}
            <div className="wishlist-products">
              {wishlist.map((product) => (
                <div key={product.product_id} 
                className="wishlist-product"
                onClick={() => navigate(`/productview/${product.product_id}`)}
                style={{ cursor: 'pointer' }}
                >
                  {/* <div className="wishlist-photo"> 
                    <img src={product.productImage} alt={product.title}/>
                  </div> */}
                  <div className="wishlist-details">
                    <p className="product-name">{product.title}</p>
                    <p className="seller-name">Seller Name: {product.name}</p>
                    <p className="sell-price">Sell Price: {product.sell_price}</p>
                    <p className="cost-price">Cost Price: {product.cost_price}</p>
                    <p className="usage">Usage: {product.usage} months</p>
                    <p className="product-description">Description: {product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          {/* </div>
        </section> */}
      </div>
    </>
  );
}

export default Wishlist;
