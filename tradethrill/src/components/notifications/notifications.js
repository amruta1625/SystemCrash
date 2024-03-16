import React, { useState, useEffect, useContext } from "react";
import "./notifications.css"; // Make sure to import your stylesheet
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  /*
  Each notification is an object with the following properties:
  data = {
    "from_name":result[0],
    "from_id": result[1],            
    "type":result[2],
    "time":result[3],
    "pid": result[4],
  }
    type = enum{REQUEST TO BUY, ACCEPTED TO SELL, REJECTED TO SELL, SOME MESSAGED YOU}
    0 request to buy
    1 accepted to sell
    2 rejected to sell
    3 someone messaged
  */
  const {authCreds, setAuthCreds} = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("http://localhost:8000/get_notifications")
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAccept = (notification) => {
    if (notification.type === 0) {
      const data = {
        pid: notification.pid,
        seller_id: authCreds.user_id,
        buyer_id: notification.from_id,
      }
      axios.post("http://localhost:8000/notify_request", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    }
  };

  const handleDecline = (notification) => {
    if (notification.type === 0) {
      const data = {
        pid: notification.pid,
        seller_id: authCreds.user_id,
        buyer_id: notification.from_id,
      }
      axios.post("http://localhost:8000/notify_decline", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div className="notifications">
      <h1 className="notifications-heading">Notifications</h1>
      <div className="notifications-container">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification">
            <div className="user">{notification.from_name}</div>
            <div className="action">{notification.type}</div>
            <div className="action">{notification.time}</div>
            {
              notification.type === 0 ?
              <div>
                <button onClick={(notification) => handleAccept(notification)}>
                  Accept
                </button>
                <button onClick={(notification) => handleDecline(notification)}>
                  Decline
                </button>
              </div> : null
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
