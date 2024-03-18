import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navigationbar"; // Adjust the path accordingly
import "./homepage.css";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  // this is the backend schema for each product
  // ⁠ product = {
  //   "product_id": row[0],
  //   "product_title": row[1],
  //   "sell_price": row[2],
  //   "seller_name": row[3],
  //   "seller_email": row[4],
  //   "product_image": row[5]
  // } ⁠

  useEffect(() => {
    axios
      .get("https://elan.iith-ac.in:8082/get_products")
      .then((response) => {
        setProducts(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="homepage">
      <div className="background">
        <Navbar search_stuff= {{products, setProducts}}/>
        <div className="recommendations-section">
          <h1 className="recommendation">Recent Recommendations</h1>
        </div>

        <div className="products-section">
          <h2 className="products-heading">Featured Products</h2>
          <div className="products-container">
            {products.map((product) => (
              <div key={product.product_id} className="product">
                <Link to={`/productview/${product.product_id}`}>
                <img
                  src={product.product_image} // modify the image url
                  alt={product.product_title}
                  className="product-image"
                />
                </Link>
                <h3>{product.product_title}</h3>
                {/* <p>{product.description}</p> */}
                <p>Price: Rs.{product.sell_price}</p>
                <p>Seller Name: {product.seller_name}</p>
                <p>Seller Email: {product.seller_email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
