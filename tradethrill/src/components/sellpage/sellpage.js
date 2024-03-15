import React, { useContext, useState } from "react";
import "./sellpage.css";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";

const SellPage = () => {
  const { authCreds, setAuthCreds } = useContext(AuthContext);
  /*
  this is for the normal image data
  ⁠     seller_id:int
    sell_price:int
    cost_price:int
    title:str
    usage:int
    description:str
    tags:str ⁠*/

  const [packet, setPacket] = useState({
    seller_id: authCreds.user_id,
    sell_price: 0,
    cost_price: 0,
    title: "",
    usage: 0,
    description: "",
    tags: "",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPacket({
      ...packet,
      [name]: value,
    });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedPhoto(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/sellproduct", packet).then((res) => {
      console.log(res);
    }
    );
  };

  return (
    <div className="sellpage">
    <div className="sell-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class="sell-container">
          <h1>Product Details</h1>
          <div class="sell-section">
            <h2>UPLOAD PHOTO</h2>
            <div class="upload-photo">
              <input
                type="file"
                id="photoInput"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <label htmlFor="photoInput">Select Photo</label>
              <img
                id="uploadedPhoto"
                src=""
                alt="Uploaded"
                style={{ maxWidth: "300px", display: "none" }}
              />
            </div>
          </div>

          {/* add a title section here */}
          <div class="sell-section">
            <h2>PRODUCT TITLE</h2>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter the title"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="sell-section">
            <h2>CATEGORY</h2>
            <div class="category-selection">
              <select name="category">
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Cycle">Cycle</option>
                <option value="Stationary">Stationary</option>
                <option value="Lab Stuff">Lab Stuff</option>
                <option value="Books">Books</option>
                <option value="Sports Essentials">Sports Essentials</option>
              </select>
            </div>
          </div>

          <div class="sell-section">
            <h2>PRODUCT DESCRIPTION</h2>
            <textarea
              name="description"
              id="description"
              placeholder="Give the detailed information and details of the product"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>

          <div class="sell-section">
            <h2>SELL PRICE</h2>
            <input
              type="text"
              name="sell_price"
              id="sell_price"
              placeholder="Enter the price"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="sell-section">
            <h2>COST PRICE</h2>
            <input
              type="text"
              name="cost_price"
              id="cost_price"
              placeholder="Enter the price"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div class="sell-section">
            <h2>USING SINCE</h2>
            <input
              type="text"
              name="usage"
              id="usage"
              placeholder="Enter the age"
            />
          </div>

          <div class="sell-section">
            <button type="submit" class="submit-button">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </div>

    </div>
    
  );
};

export default SellPage;
