import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './chatpage.css';

function ChatPage() {
  const { userId } = useParams(); // Get the seller's ID from the URL params
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newWs = new WebSocket(`ws://localhost:8000/chat/${userId}`); // Connect to chat with the seller
    newWs.onopen = () => {
      console.log('WebSocket connected');
    };

    newWs.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'message') {
        setMessages([...messages, data.message]);
      } else if (data.type === 'userList') {
        setUsers(data.userList);
      }
    };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, [messages, userId]);

  

  const sendMessage = () => {
    if (ws && inputMessage.trim() !== '') {
      const message = {
        type: 'message',
        content: inputMessage,
        receiver: selectedUser
      };
      ws.send(JSON.stringify(message));
      setMessages([...messages, message]);
      setInputMessage('');
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    // Clear previous messages
    setMessages([]);
    // Request conversation history with selected user
    const requestHistory = {
      type: 'history',
      user: user
    };
    ws.send(JSON.stringify(requestHistory));
  };

  return (
    <div className="chat-page-container">
      <div className="user-list">
        <h2>Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index} onClick={() => selectUser(user)}>
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div className="conversation">
        <h2>{selectedUser ? `Conversation with ${selectedUser}` : 'Select a user'}</h2>
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === selectedUser ? 'sent-message' : 'received-message'}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
