// import React, { useState, useEffect, useContext } from "react";
// import "./notifications.css"; // Make sure to import your stylesheet
// import axios from "axios";
// import AuthContext from "../../context/AuthProvider";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   /*
//   Each notification is an object with the following properties:
//   data = {
//     "from_name":result[0],
//     "from_id": result[1],            
//     "type":result[2],
//     "time":result[3],
//     "pid": result[4],
//   }
//     type = enum{REQUEST TO BUY, ACCEPTED TO SELL, REJECTED TO SELL, SOME MESSAGED YOU}
//     0 request to buy
//     1 accepted to sell
//     2 rejected to sell
//     3 someone messaged
//   */
//   const {authCreds, setAuthCreds} = useContext(AuthContext);
//   useEffect(() => {
//     axios
//       .get(`https://elan.iith-ac.in:8082/get_notifications/${authCreds.user_id}`)
//       .then((response) => {
//         setNotifications(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handleAccept = (notification) => {
//     if (notification.type === 0) {
//       const data = {
//         pid: notification.pid,
//         seller_id: authCreds.user_id,
//         buyer_id: notification.from_id,
//       }
//       axios.post("https://elan.iith-ac.in:8082/notify_request", data)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     }
//   };

//   const handleDecline = (notification) => {
//     if (notification.type === 0) {
//       const data = {
//         pid: notification.pid,
//         seller_id: authCreds.user_id,
//         buyer_id: notification.from_id,
//       }
//       axios.post("https://elan.iith-ac.in:8082/notify_decline", data)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     }
//   };

//   return (
//     <div className="notifications">
//       <h1 className="notifications-heading">Notifications</h1>
//       <div className="notifications-container">
//         {notifications.map((notification) => (
//           <div key={notification.id} className="notification">
//             <div className="user">{notification.from_name}</div>
//             <div className="action">{notification.type}</div>
//             <div className="action">{notification.time}</div>
//             {
//               notification.type === 0 ?
//               <div>
//                 <button onClick={(notification) => handleAccept(notification)}>
//                   Accept
//                 </button>
//                 <button onClick={(notification) => handleDecline(notification)}>
//                   Decline
//                 </button>
//               </div> : null
//             }
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notifications;



// //add the matter of the notification
// //now its displaying type of notification 0,1,2,3
// //0 request to buy.... matter is buyer_name(buyer_id = ...) requested to buy your product_title
// // 1 accepted to sell... matter is seller_name(seller_id = ...) sold product_title to you
// // 2 rejected to sell... matter is seller_name(seller_id = ...) rejected to sell product_title
// // 3 someone messaged... matter is user_name(user_id) messaged you

// //also we need to fetch the product title from pid and show that in matter


// //also make accept, decline functions to work 
// //and when you click on accept, the product should go into transactions and the notification of type 1 goes to buyer
// //when you click on decline, notification disappears for seller and notification of type 2 goes to buyer



// //and make decline button red

import React, { useState, useEffect, useContext } from "react";
import "./notifications.css"; // Make sure to import your stylesheet
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { authCreds } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://elan.iith-ac.in:8082/get_notifications/${authCreds.user_id}`)
      // .get(`http://127.0.0.1:8000/get_notifications/${authCreds.user_id}`)
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
      };
      axios.post("https://elan.iith-ac.in:8082/notify_accept", data)
      // axios.post("http://127.0.0.1:8000/notify_accept", data)
        .then((response) => {
          console.log(response);
          // Update notification to show as accepted
          const updatedNotifications = notifications.map((notif) => {
            if (notif.id === notification.id) {
              return { ...notif, accepted: true };
            }
            return notif;
          });
          setNotifications(updatedNotifications);
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
      };
      axios.post("https://elan.iith-ac.in:8082/notify_reject", data)
      // axios.post("http://127.0.0.1:8000/notify_reject", data)
        .then((response) => {
          console.log(response);
          // Remove declined notification
          const updatedNotifications = notifications.filter(
            (notif) => notif.id !== notification.id
          );
          setNotifications(updatedNotifications);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const renderNotificationType = (type) => {
    switch (type) {
      case 0:
        return "requested to buy";
      case 1:
        return "sold the product";
      case 2:
        return "rejected to sell";
      case 3:
        return "bought the product";
      case 4:
        return "messaged you";
      default:
        return "";
    }
  };

  return (
    <div className="notifications">
      <h1 className="notifications-heading">Notifications</h1>
      <div className="notifications-container">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification">
            <div className="user">{notification.from_name}</div>
            <div className="action">
              {renderNotificationType(notification.type)}: {notification.matter}
            </div>
            <div classname="product_title">{notification.product_title}</div>
            <div className="action">{notification.time}</div>
            {notification.type === 0 && (
              <div>
                {notification.accepted ? (
                  <span>Accepted</span>
                ) : (
                  <>
                    <button onClick={() => handleAccept(notification)}>Accept</button>
                    <button className="decline-btn" onClick={() => handleDecline(notification)}>Decline</button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
