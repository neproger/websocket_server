import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import ControllPanel from './ControllPanel';
import WebSocketInstance from './utils/wsi';
import MessageList from './comps/MessageList';

WebSocketInstance.connect();

const AppContent = () => {
    const [messages, setMessages] = useState([]);
    const [clientCount, setClientCount] = useState(0);

    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        const countListener = (count) => {
            setClientCount(count);
        };

        WebSocketInstance.addMessageListener(messageListener);
        WebSocketInstance.addCountListener(countListener);

        return () => {
            WebSocketInstance.removeMessageListener(messageListener);
            WebSocketInstance.removeCountListener(countListener);
        };
    }, []);

    return (
        <div className="App">
            <AppHeader />
            <div className="App-main">
                <MessageList messages={messages} />
            </div>
            <div className="App-footer">
                <ControllPanel client_count={clientCount} />
            </div>
        </div>
    );
};

export default AppContent;
