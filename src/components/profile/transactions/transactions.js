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
      .get(`https://elan.iith-ac.in:8082/get_transactions/${authCreds.user_id}`)
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
        <div className="transactions-container">
          <div className="transaction-listsold">
            <h2 className="transaction-heading">Items Sold</h2>
            {transactions.sold_results &&
              transactions.sold_results.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-details">
                    <p className="item-name">{transaction.title}</p>
                    <p className="item-description">
                      Description: {transaction.description}
                    </p>
                    <p className="item-cost">{transaction.cost}</p>
                    <p className="item-id">{transaction.buyer_id}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="transaction-listbought">
            <h2 className="transaction-heading">Items Bought</h2>
            {transactions.bought_results &&
              transactions.bought_results.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-details">
                    <p className="item-name">{transaction.title}</p>
                    <p className="item-description">
                      Description: {transaction.description}
                    </p>
                    <p className="item-cost">{transaction.cost}</p>
                    <p className="item-id">{transaction.seller_id}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
