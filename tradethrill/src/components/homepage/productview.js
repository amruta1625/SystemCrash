import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './productview.css';
// import AuthContext from "../../context/AuthProvider";
import axios from "axios";

const ProductViewPage = () => {
  const { product_id } = useParams(); // Get the product_id from the URL params

  // const products = [
  //   {
  //     id: '1',
  //     name: 'Product Name 1',
  //     description: 'Product Description 1',
  //     price: 19.99,
  //     imageUrl: 'https://example.com/product1.jpg',
  //     seller: {
  //       id: 'seller1',
  //       name: 'Seller Name 1',
  //       email: 'seller1@example.com',
  //     },
  //   },
  //   {
  //     id: '2',
  //     name: 'Product Name 2',
  //     description: 'Product Description 2',
  //     price: 24.99,
  //     imageUrl: 'https://example.com/product2.jpg',
  //     seller: {
  //       id: 'seller2',
  //       name: 'Seller Name 2',
  //       email: 'seller2@example.com',
  //     },
  //   },
  // ];

  // Sample product and seller data (replace with actual data fetched from backend)

  // const [product, setProduct] = useState({
  //   id: '1',
  //   name: 'Product Name 1',
  //   description: 'Product Description 1',
  //   price: 19.99,
  //   imageUrl: 'https://example.com/product1.jpg',
  //   seller: {
  //     id: 'seller1',
  //     name: 'Seller Name 1',
  //     email: 'seller1@example.com',
  //   },
  // });

  const [product, setProduct] = useState([]);
  // const { authCreds } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get_specific_product/${product_id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [product_id]);
  // useEffect(() => {
  //   const initialProduct = {
  //     id: 'default-id', // Replace with a default value if no product is found
  //     name: 'Default Product Name',
  //     description: 'This is a default product description.',
  //     price: 19.99,
  //     imageUrl: 'https://example.com/default-product.jpg',
  //     seller: {
  //       id: 'default-seller-id',
  //       name: 'Default Seller Name',
  //       email: 'seller@example.com',
  //     },
  //   };

  //   if (product_id) {
  //     const simulatedProduct = {
  //       id: product_id,
  //       name: `Product Name ${product_id}`,
  //       description: `Description for product ${product_id}`,
  //       price: 24.99,
  //       imageUrl: 'https://example.com/product.jpg',
  //       seller: {
  //         id: 'seller123',
  //         name: 'Seller Name',
  //         email: 'seller@example.com',
  //       },
  //     };
  //     setProduct(simulatedProduct);
  //   } else {
  //     setProduct(initialProduct);
  //   }
  // }, []);

  const [isWishlist, setIsWishlist] = useState(false);
  const [reportButtonText, setReportButtonText] = useState('Report User');
  const [isReportDisabled, setIsReportDisabled] = useState(false);

  const toggleWishlist = () => {
    setIsWishlist((prevState) => !prevState);
  };

  const reportUser = () => {
    setReportButtonText('Reported');
    setIsReportDisabled(true);
  };

  return (
    <div className="product-view-page">
      <div className="product-details">
        <img src={product.imageUrl} alt={product.name} />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
      <div className="seller-details">
        <h2>Seller Information</h2>
        <p>Name: {product.seller.name}</p>
        <p>Email: {product.seller.email}</p>
      </div>
      <div className="actions">
        <button onClick={toggleWishlist}>
          {isWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
        <button onClick={reportUser} disabled={isReportDisabled}>
          {reportButtonText}
        </button>
        <button>Request</button>
        <button>Chat with Seller</button>
      </div>
    </div>
  );
};

export default ProductViewPage;
