import React, { useState, useEffect } from 'react';
import './Wishlist.css'
//import Navbar from '../Navbar/navbar';

// Sample data for wishlist items
const sampleWishlist = [
  {
    id: 1,
    itemName: 'Sample Wishlist Item 1',
    itemImage: 'sample-wishlist-item-1.jpg',
    description: 'This is a sample description for wishlist item 1.',
  },
  {
    id: 2,
    itemName: 'Sample Wishlist Item 2',
    itemImage: 'sample-wishlist-item-2.jpg',
    description: 'This is a sample description for wishlist item 2.',
  },
  {
    id: 3,
    itemName: 'Sample Wishlist Item 3',
    itemImage: 'sample-wishlist-item-3.jpg',
    description: 'This is a sample description for wishlist item 3.',
  },
  {
    id: 4,
    itemName: 'Sample Wishlist Item 4',
    itemImage: 'sample-wishlist-item-4.jpg',
    description: 'This is a sample description for wishlist item 4.',
  },
  // Add more sample wishlist items as needed
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching wishlist items from an API
    setTimeout(() => {
      setWishlist(sampleWishlist);
      setLoading(false);
    }, 1000); // Simulate loading time of 1 second
  }, []);

  return (
    <>
      {/* <Navbar wishlist="active" /> */}
      <div className="content-container">
        <h1 className="heading">Your Wishlist</h1>
        <section className="wishlist-section">
          <div className="wishlist-container">
            <div className="wishlist-items">
              {wishlist.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <div className="wishlist-photo">
                    <img src={item.itemImage} alt={item.itemName} />
                  </div>
                  <div className="wishlist-details">
                    <p className="item-name">{item.itemName}</p>
                    <p className="item-description">Description: {item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Wishlist;
