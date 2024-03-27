import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory hook for navigation
import "./uploadeditems.css"; // Import the CSS file
import AuthContext from "../../context/AuthProvider";

const UploadedItems = () => {
  const [uploadedItems, setUploadedItems] = useState([]);
  const { authCreds } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useHistory hook

  useEffect(() => {
    axios
      .get(`https://elan.iith-ac.in:8082/on_sale/${authCreds.user_id}`)
      // .get(`http://127.0.0.1:8000/on_sale/${authCreds.user_id}`)
      .then((res) => {
        setUploadedItems(res.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [authCreds.user_id]);

  // Function to handle edit button click
  const handleEdit = (itemId) => {
    console.log("Navigating to edit page with itemId:", itemId);
    navigate(`/sellpage/${itemId}`);
  };

  return (
    <div className="uploaded-items-container">
      <h2 className="heading">Items Uploaded by You</h2>
      <div className="item-list">
        {uploadedItems.map((item) => (
          <div key={item.product_id} className="uploaded-item">
            <p>Title: {item.title}</p>
            <p>Description: {item.description}</p>
            <p>Sell Price: {item.sell_price}</p>
            <p>Cost Price: {item.cost_price}</p>
            <p>Usage: {item.usage} months</p>
            <p>Number of people interested: {item.nf_interests}</p>
            <p></p>
            {/* Edit button */}
            <button onClick={() => handleEdit(item.product_id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedItems;
