import React from 'react';
import './App.css';

import WebSocketInput from './comps/WebSocketInput';

function ControllPanel({ client_count }) {
  console.log(client_count);

  return (
      <div className="flex-row flex-grow-1 container">
        <div className="App-card Link">
        { client_count }
        </div>        
        <WebSocketInput />
      </div>
  );
}

export default ControllPanel;
