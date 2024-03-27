import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './productview.css';
import AuthContext from "../../context/AuthProvider";
import axios from "axios";

const ProductViewPage = () => {
  const { product_id } = useParams(); // Get the product_id from the URL params


  const [product, setProduct] = useState([]);
  const { authCreds } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://elan.iith-ac.in:8082/get_specific_product/${product_id}`)
      // .get(`http://127.0.0.1:8000/get_specific_product/${product_id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [product_id]);
  
  const [isWishlist, setIsWishlist] = useState(false);
  const [reportButtonText, setReportButtonText] = useState('Report User');
  const [isReportDisabled, setIsReportDisabled] = useState(false);

  const toggleWishlist = () => {
    setIsWishlist((prevState) => !prevState);
  };



  const addToWishlist = () => {
    let data  = {
      product_id: 0,
      buyer_id: 0,
    }
    data = {
      product_id: parseInt(product_id),
      buyer_id: parseInt(authCreds.user_id),
    }
    console.log(data)
    axios.post("https://elan.iith-ac.in:8082/wishlist", data)
    // axios.post("http://127.0.0.1:8000/wishlist", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reportUser = () => {
    setReportButtonText('Reported');
    setIsReportDisabled(true);
  };

  const report = () => {
    let data  = {
      product_id: 0,
      reporter_id: 0,
    }
    data = {
      product_id: parseInt(product_id),
      reporter_id: parseInt(authCreds.user_id),
    }
    console.log(data)
    axios.post("https://elan.iith-ac.in:8082/report", data)
    // axios.post("http://127.0.0.1:8000/report", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="product-view-page">
      <div className="product-details">
        <img src={product.imageUrl} alt={product.title} />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Sell Price: Rs.{product.sell_price}</p>
        <p>Cost Price: Rs.{product.cost_price}</p>
        <p>Usage: {product.usage} months</p>
      </div>
      <div className="seller-details">
        <h2>Seller Information</h2>
        <p>Seller Name: {product.seller_name}</p>
        <p>Seller Email: {product.seller_email}</p>
      </div>
      <div className="actions">
        <button onClick={() => addToWishlist()}>
          Add to Wishlist
        </button>
        <button onClick={() => report()}>
          Report User
        </button>
        {/* <button onClick={reportUser} disabled={isReportDisabled}>
          {reportButtonText}
        </button> */}
        <button>Request</button>
        <button>Chat with Seller</button>
      </div>
    </div>
  );
};

export default ProductViewPage;
