import React, { useState } from 'react';
import WebSocketInstance from '../utils/wsi';


function WebSocketInput() {
    const [inputValue, setInputValue] = useState('');
    const [name, setName] = useState('Без имени');

    const sendMessage = () => {
        if (inputValue === '') {
            return;
        }
        WebSocketInstance.sendMessage(name, inputValue);
        setInputValue('');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handlNameChange = (e) => {
        if (e.target.value === '') {
            return;
        }
        setName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) { // Код клавиши Enter
            sendMessage();
        }
    };

    return (
        <div className="flex-row container">
            <input
                className='name App-card'
                onChange={handlNameChange}
                type="text"
                placeholder="Name"
            />
            <input
                className='input-message flex-grow-1 App-card'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Enter your message"
            />


            <div className='App-card Link' onClick={sendMessage}>send</div>
        </div>
    );
}

export default WebSocketInput;
