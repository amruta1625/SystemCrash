import React, { useState } from 'react';
import  { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./productview.css"

const ProductViewPage = () => {
  const { productId } = useParams(); // Get the productId from the URL params

  const products = [
    {
      id: "1",
      name: 'Product Name 1',
      description: 'Product Description 1',
      price: 19.99,
      imageUrl: 'https://example.com/product1.jpg',
      seller: {
        id: 'seller1',
        name: 'Seller Name 1',
        email: 'seller1@example.com',
      },
    },
    {
      id: "2",
      name: 'Product Name 2',
      description: 'Product Description 2',
      price: 24.99,
      imageUrl: 'https://example.com/product2.jpg',
      seller: {
        id: 'seller2',
        name: 'Seller Name 2',
        email: 'seller2@example.com',
      },
    },
  ];

  // Sample product and seller data (replace with actual data fetched from backend)
  const [product, setProduct] = useState( {
    id: "1",
    name: 'Product Name 1',
    description: 'Product Description 1',
    price: 19.99,
    imageUrl: 'https://example.com/product1.jpg',
    seller: {
      id: 'seller1',
      name: 'Seller Name 1',
      email: 'seller1@example.com',
    },
  });

  useEffect(() => {
    // Set the initial product state based on productId when the component mounts
    const initialProduct = {
      // Define the default product properties here
      id: 'default-id', // Replace with a default value if no product is found
      name: 'Default Product Name',
      description: 'This is a default product description.',
      price: 19.99,
      imageUrl: 'https://example.com/default-product.jpg',
      seller: {
        id: 'default-seller-id',
        name: 'Default Seller Name',
        email: 'seller@example.com',
      },
    };

    // Logic to update product based on productId (fetch from API or backend, if applicable)
    // Replace this example with your actual data fetching or logic
    if (productId) {
      // Example: Simulate fetching product details (replace with actual API call)
      const simulatedProduct = {
        id: productId,
        name: `Product Name ${productId}`,
        description: `Description for product ${productId}`,
        price: 24.99,
        imageUrl: 'https://example.com/product.jpg',
        seller: {
          id: 'seller123',
          name: 'Seller Name',
          email: 'seller@example.com',
        },
      };
      setProduct(simulatedProduct);
    } else {
      // Set the default product if no productId is found
      setProduct(initialProduct);
    }
  }, []);


  // State for wishlist
  const [isWishlist, setIsWishlist] = useState(false);

  // Function to toggle wishlist
  const toggleWishlist = () => {
    setIsWishlist(prevState => !prevState);
  };

  // Function to handle request
  const handleRequest = () => {
    // Logic to handle request
    // For example, redirect to a request form
  };

  // Function to handle chat
  const handleChat = () => {
    // Logic to start chat with seller
    // For example, redirect to a chat room
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
        <button onClick={handleRequest}>Request</button>
        <button onClick={handleChat}>Chat with Seller</button>
      </div>
    </div>
  );
};

export default ProductViewPage;