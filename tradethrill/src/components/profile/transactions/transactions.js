import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/navbar';
import axios from 'axios';
import './transactions.css';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('your-api-endpoint');
        setTransactions(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <Navbar trans="active" />
      <section>
        <h1 className="heading">Your Transactions</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="rm">
              <div className="kd">
                <img src={transaction.itemImage} alt={transaction.itemName} />
              </div>
              <div className="lib">
                <p style={{ marginBottom: '5px' }}>{transaction.itemName}</p>
                <p>Description:</p>
                <p>{transaction.description}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
