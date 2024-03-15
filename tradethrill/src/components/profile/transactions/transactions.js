import React, { useState, useEffect } from 'react';
import './transactions.css';
import Navbar from '../Navbar/navbar';

// Sample data for transactions
const sampleTransactions = [
  {
    id: 1,
    itemName: 'Sample Item 1',
    itemImage: 'sample-item-1.jpg',
    description: 'This is a sample description for item 1.',
  },
  {
    id: 2,
    itemName: 'Sample Item 2',
    itemImage: 'sample-item-2.jpg',
    description: 'This is a sample description for item 2.',
  },
  {
    id: 3,
    itemName: 'Sample Item 3',
    itemImage: 'sample-item-3.jpg',
    description: 'This is a sample description for item 3.',
  },
  {
    id: 4,
    itemName: 'Sample Item 4',
    itemImage: 'sample-item-4.jpg',
    description: 'This is a sample description for item 4.',
  },
  // Add more sample transactions as needed
];

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching transactions from an API
    setTimeout(() => {
      setTransactions(sampleTransactions);
      setLoading(false);
    }, 1000); // Simulate loading time of 1 second
  }, []);

  return (
    <>
      <Navbar trans="active" />
      <div className="content-container">
        <h1 className="heading">Your Transactions</h1>
        <section className="transactions-section">
          <div className="transaction-container">
            <div className="transaction-list">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-photo">
                    <img src={transaction.itemImage} alt={transaction.itemName} />
                  </div>
                  <div className="transaction-details">
                    <p className="item-name">{transaction.itemName}</p>
                    <p className="item-description">Description: {transaction.description}</p>
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

export default Transactions;
