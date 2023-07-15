import React, { useEffect, useState } from 'react';
import WebSocketInstance from './utils/WebSocketInstance';
import MessageList from './comps/MessageList';

function WebSocket() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    WebSocketInstance.connect();
  }, []);

  const sendMessage = () => {
    WebSocketInstance.sendMessage(inputValue);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleReceivedMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    WebSocketInstance.addMessageListener(handleReceivedMessage);
    return () => {
      WebSocketInstance.removeMessageListener(handleReceivedMessage);
    };
  }, []);

  return (
    <div className="WebSocket">
      <div className="WebSocket-input">
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Enter your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <MessageList messages={messages} />
    </div>
  );
}

export default WebSocket;
