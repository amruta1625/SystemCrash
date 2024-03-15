import React, { useState, useEffect } from 'react';
import './chatpage.css'; // Import your CSS file

// Define the users data
const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
];

// Sidebar component for users list
const Sidebar = ({ users, onSelectUser }) => {
  return (
    <div className="menu">
      <ul className="items">
        {users.map((user) => (
          <li key={user.id} className="item" onClick={() => onSelectUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Chat window component
const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="chat">
      <div className="header-chat">
        {selectedUser && <div className="name">Chat with {selectedUser.name}</div>}
      </div>
      <div className="messages-chat">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}>
            <div className="message-box">
              <div className="sender">{message.sender === 'user' ? 'You' : selectedUser.name}</div>
              <div className="text">{message.text}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="footer-chat">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type a message..."
          className="write-message"
        />
        <button type="submit" className="send">
          Send
        </button>
      </form>
    </div>
  );
};

// Main chat page component
const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageHistories, setMessageHistories] = useState({});

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Initialize message history if not exists
    if (!messageHistories[user.id]) {
      setMessageHistories({
        ...messageHistories,
        [user.id]: [],
      });
    }
  };

  // Function to send a message
  const handleSendMessage = (text) => {
    // Send message to selected user
    if (selectedUser) {
      const newMessage = {
        text,
        sender: 'user', // Assuming user is sending the message
      };
      setMessageHistories({
        ...messageHistories,
        [selectedUser.id]: [...messageHistories[selectedUser.id], newMessage],
      });
    }
  };

  // Function to simulate receiving a message from the receiver
  const receiveMessage = () => {
    if (selectedUser) {
      const responseMessage = {
        text: 'Response from user',
        sender: 'receiver',
      };
      setMessageHistories({
        ...messageHistories,
        [selectedUser.id]: [...messageHistories[selectedUser.id], responseMessage],
      });
    }
  };

  useEffect(() => {
    // Simulate receiving initial messages from other users when component mounts
    const initialMessages = {
      1: [{ text: 'Hello', sender: 'receiver' }],
      2: [{ text: 'Hi there', sender: 'receiver' }],
      3: [{ text: 'Hey', sender: 'receiver' }],
    };
    setMessageHistories(initialMessages);

    // Simulate receiving a response message after a delay
    const timerId = setTimeout(receiveMessage, 1000);
    return () => clearTimeout(timerId); // Cleanup function
  }, []);

  return (
    <div className="container">
      <Sidebar users={users} onSelectUser={handleSelectUser} />
      {selectedUser && (
        <ChatWindow
          selectedUser={selectedUser}
          messages={messageHistories[selectedUser.id] || []}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default ChatPage;
