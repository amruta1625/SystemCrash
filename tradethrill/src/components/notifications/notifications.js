import React, { useState, useEffect } from 'react';
import './notifications.css'; // Make sure to import your stylesheet

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching notifications from the backend
    fetchNotificationsFromBackend()
      .then((data) => setNotifications(data))
      .catch((error) => console.error('Error fetching notifications:', error));
  }, []);

  const fetchNotificationsFromBackend = async () => {
    // Simulate fetching notifications data from the backend
    return [
      { id: 1, user: 'User 1', action: 'has accepted to sell the product', status: 'Accepted' },
      { id: 2, user: 'User 2', action: 'has declined to sell the product', status: 'Declined' },
      { id: 3, user: 'User 3', action: 'has requested the product' },
    ];
  };

  const handleAccept = (id) => {
    // Simulate updating the status on the backend
    updateNotificationStatus(id, 'Accepted');
  };

  const handleDecline = (id) => {
    // Simulate updating the status on the backend
    updateNotificationStatus(id, 'Declined');
  };

  const updateNotificationStatus = async (id, status) => {
    // Simulate updating the status on the backend
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, status } : notification
    );

    setNotifications(updatedNotifications);
  };

  return (
    <div className="notifications">
      <h1 className="notifications-heading">Notifications</h1> 
      <div className="notifications-container">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification">
            <div className="user">{notification.user}</div>
            <div className="action">{notification.action}</div>
            {notification.status ? (
              <div className={`status ${notification.status.toLowerCase()}`}>
                {notification.status}
              </div>
            ) : (
              <div className="btns">
                <button onClick={() => handleAccept(notification.id)}>ACCEPT</button>
                <button onClick={() => handleDecline(notification.id)}>DECLINE</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;