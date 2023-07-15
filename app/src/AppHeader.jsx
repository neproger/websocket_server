import React, { useEffect, useState } from 'react';


const AppHeader = () => {
    const [isColonFormat, setIsColonFormat] = useState(true);
    const [time, setTime] = useState('');

    useEffect(() => {

        const timer = setInterval(() => {
            setIsColonFormat((prevIsColonFormat) => !prevIsColonFormat);
            setTime(getCurrentTime());
        }, 1000);

        const getCurrentTime = () => {
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            if (isColonFormat) {
                return `${hours} : ${minutes}`;
            } else {
                return `${hours} . ${minutes}`;
            }
        };

        return () => {
            clearInterval(timer);
        };
    }, [isColonFormat]);

    return (
        <div className="App-header">
            <div className="container">
                
                <div className='App-card flex-grow-1'>
                
                    <div>KazDev</div>
                    
                </div>
                <div className='App-card time'>{time}</div>
            </div>
        </div>
    );
};

export default AppHeader;