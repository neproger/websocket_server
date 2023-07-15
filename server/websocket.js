const ws = require('ws');
const fs = require('fs');

const name = 'сервер';

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`))

let num = 0;
const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours} : ${minutes}`;
};

wss.on('connection', function connection(ws) {
    num++;
    console.log('Client connected: ' + num);
    broadcastMessage({
        event: 'client_count',
        username: name,
        message: `${num}`,
        time: getCurrentTime()
    });

    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
            case 'file':
                // Обработка принятого файла
                saveFile(message);
                break;
        }
    });

    ws.on('close', function () {
        num--;
        console.log('Client disconnected: ' + num);
        broadcastMessage({
            event: 'client_count',
            username: name,
            message: num,
            time: getCurrentTime()
        });
    });
});

function saveFile(message) {
    const filename = message.filename;
    const content = message.content;

    // Декодирование содержимого файла из Base64
    const fileData = Buffer.from(content, 'base64');

    // Дальнейшая обработка файла
    // Например, сохранение на диск или другие действия

    // Пример сохранения файла на диск
    const fileName = filename;
    const filePath = `../client/app/public/img/${filename}`;
    fs.writeFile(filePath, fileData, (err) => {
        if (err) {
            console.error('Ошибка при сохранении файла:', err);
        } else {
            console.log('Файл сохранен:', filePath);
            broadcastMessage({
                event: 'photo',
                username: 'Сервер',
                message: fileName,
                filePath: fileName,
                time: getCurrentTime()
            });
        }
    });
    
};

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    });
    console.log("broadkast " + JSON.stringify(message));
};
