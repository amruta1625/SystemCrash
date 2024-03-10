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
    // const response = await fetch('https://your-backend-api/notifications');
    // const data = await response.json();
    // return data;
    try {
        const response = await fetch('https://your-backend-api/notifications');
        if (!response.ok) {
          throw new Error(`Failed to fetch notifications. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
      }
    
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
  );
};

export default Notifications;
