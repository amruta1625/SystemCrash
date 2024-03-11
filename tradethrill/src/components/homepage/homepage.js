// Home.js
import React, { useState, useEffect } from 'react';
import Navbar from './navigationbar'; // Adjust the path accordingly
import './homepage.css';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from your API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('your-product-api-endpoint');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="homepage">
      <div className="background">
        <Navbar />
        <div className="recommendations-section">
          <h1 className='recommendation'>
            Recent Recommendations
          </h1>
          {/* Additional content for recent recommendations goes here */}
        </div>

        <div className="products-section">
          <h2 className="products-heading">Featured Products</h2>
          <div className="products-container">
            {products.map(product => (
              <div key={product.id} className="product">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
