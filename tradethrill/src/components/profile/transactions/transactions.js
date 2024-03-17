import React, { useState, useEffect, useContext } from "react";
import "./transactions.css";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import AuthContext from "../../../context/AuthProvider";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { authCreds } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get_transactions/${authCreds.user_id}`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [authCreds.user_id]); // Ensure useEffect runs whenever authCreds.user_id changes

  return (
    <>
      <Navbar trans="active" />
      <div className="content-container">
        <h1 className="heading">Your Transactions</h1>
        <section className="transactions-section">
          <div className="transaction-container">
            <h1 className="transaction-heading">Items Sold</h1>
            <div className="transaction-list">
              {transactions.sold_results &&
                transactions.sold_results.map((transaction) => (
                  <div key={transaction} className="transaction-item">
                    <div className="transaction-details">
                      <p className="item-name">{transaction.title}</p>
                      <p className="item-description">
                        Description: {transaction.description}
                      </p>
                      <p className="item-name">{transaction.cost}</p>
                      <p className="item-name">{transaction.buyer_id}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="transactions-section">
          <div className="transaction-container">
            <h1 className="transaction-heading">Items Bought</h1>
            <div className="transaction-list">
              {transactions.bought_results &&
                transactions.bought_results.map((transaction) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-details">
                      <p className="item-name">{transaction.title}</p>
                      <p className="item-description">
                        Description: {transaction.description}
                      </p>
                      <p className="item-name">{transaction.cost}</p>
                      <p className="item-name">{transaction.seller_id}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Transactions;