// src/Chat.js
import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const newWs = new WebSocket('ws://localhost:3001');
    setWs(newWs);

    // Clean up on component unmount
    return () => {
      newWs.close();
    };
  }, []);

  useEffect(() => {
    // Listen for incoming messages
    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
    }
  }, [ws]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        text: newMessage,
      };

      // Send the message to the server
      ws.send(JSON.stringify(message));
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        <h2>Chat</h2>
      </div>
      <div>
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              <strong>User:</strong> {message.text}
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
