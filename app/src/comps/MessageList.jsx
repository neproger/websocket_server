import React, { useEffect, useRef } from 'react';

function MessageList({ messages }) {
  const listRef = useRef(null);

  useEffect(() => {
    // Прокрутка к последнему элементу списка
    if (listRef.current) {
      listRef.current.lastChild.scrollIntoViewIfNeeded({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ul className="App-list container" >
      {messages.map((message, index) => (
        <li className="flex-row " key={index} ref={listRef}>
          <div className="id App-card">{index + 1}</div>
          <div className="user-name App-card"><span>{message.username}</span></div>
          <div className="message App-card flex-grow-1">
            <p>
              {message.filePath && <img src={`./img/${message.filePath}`} alt="Image" />}
              {message.message}
            </p></div>
          <div className="date App-card">{message.time}</div>
        </li>
      ))}
    </ul>
  );
}

export default MessageList;
