import React, { useState } from 'react';
import './sellpage.css';

const SellPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

  return (
    <div className="sell-container">
      <h1>Product Details</h1> {/* New heading added here */}
      <div className="sell-section">
        <h2>UPLOAD PHOTO</h2>
        <div className="upload-photo">
          <input
            type="file"
            id="photoInput"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <label htmlFor="photoInput">Select Photo</label>
          {selectedPhoto && (
            <img
              id="uploadedPhoto"
              src={selectedPhoto}
              alt="Uploaded"
              style={{ maxWidth: '300px' }}
            />
          )}
        </div>
      </div>

      <div className="sell-section">
        <h2>CATEGORY</h2>
        <div className="category-selection">
          <select>
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Cycle">Cycle</option>
            <option value="Stationary">Stationary</option>
            <option value="Lab Stuff">Lab Stuff</option>
            <option value="Books">Books</option>
            <option value="Sports Essentials">Sports Essentials</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      <div className="sell-section">
        <h2>PRODUCT DESCRIPTION</h2>
        <textarea placeholder="Give the detailed information and details of the product"></textarea>
      </div>

      <div className="sell-section">
        <h2>BASE PRICE</h2>
        <input type="text" placeholder="Enter the price" />
      </div>

      <div className="sell-section">
        <h2>USING SINCE</h2>
        <input type="text" placeholder="Enter the age" />
      </div>

      <div className="sell-section">
        <button className="submit-button">SUBMIT</button>
      </div>
    </div>
  );
};

export default SellPage;
