import React, { useState, useEffect } from "react";
import axios from "axios";
import "./uploadeditems.css"; // Import the CSS file

const UploadedItems = ({ userId }) => {
  const [uploadedItems, setUploadedItems] = useState([]);

  useEffect(() => {
    const fetchUploadedItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/items/uploaded/${userId}`);
        setUploadedItems(response.data);
      } catch (error) {
        console.error("Error fetching uploaded items:", error);
      }
    };

    fetchUploadedItems();
  }, [userId]);

  // Function to handle edit button click
  const handleEdit = (itemId) => {
    // Implement your edit logic here
    console.log("Edit item with ID:", itemId);
  };

  return (
    <div className="uploaded-items-container">
      <h2 className="heading">Items Uploaded by You</h2>
      <div className="item-list">
        {uploadedItems.map((item) => (
          <div key={item.id} className="uploaded-item">
            <p>Title: {item.title}</p>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            {/* Edit button */}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedItems;
