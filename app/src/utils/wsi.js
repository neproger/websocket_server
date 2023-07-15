

class WebSocketInstance {
    constructor() {
        this.socket = null;
        this.messages = [];
        this.messageListeners = [];
        this.clientCountListeners = [];
    }

    handleConnection = () => {
        const isOpen = this.socket.readyState === WebSocket.OPEN;
        console.log(`WebSocket ${isOpen ? 'connected' : 'disconnected'}`);
        if (!isOpen) {
            this.reconnect();
        }
    }

    connect() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.log("WebSocket already connected");
            return;
        }

        this.socket = new WebSocket("ws://kazdev.ddns.net:5000");

        this.socket.addEventListener("open", this.handleConnection);

        this.socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            console.log(
                "WebSocket event data:",
                message.event,
                " | ",
                message.message
            );

            if (message.event === "message") {
                this.messages.push(message);
                this.messageListeners.forEach((listener) => listener(message));
            }

            if (message.event === "client_count") {
                this.clientCount = message.message;
                this.clientCountListeners.forEach((listener) => listener(this.clientCount));
                console.log(this.clientCount);
            }

            if (message.event === "photo") {
                this.messages.push(message);
                this.messageListeners.forEach((listener) => listener(message));
                console.log("Received file path:", this.messages);
                // Дальнейшая обработка пути к файлу
            }
        });

        this.socket.addEventListener("close", this.handleConnection);
    }

    reconnect() {
        const reconnectInterval = setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.CLOSED) {
                console.log("Trying to reconnect WebSocket...");
                this.connect();
                clearInterval(reconnectInterval);
            }
        }, 1000);
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }

    sendMessage(name, message) {
        const getCurrentTime = () => {
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${hours} : ${minutes}`;
        };
        const payload = {
            event: "message",
            username: name,
            message,
            time: getCurrentTime(),
        };
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(payload));
        } else {
            this.reconnect();
        }
    }

    getMessages() {
        return [...this.messages];
    }

    getStatus() {
        return this.socket ? [this.socket.readyState] : [];
    }

    addCountListener(listener) {
        this.clientCountListeners.push(listener);
    }

    removeCountListener(listener) {
        this.clientCountListeners = this.clientCountListeners.filter(
            (item) => item !== listener
        );
    }

    addMessageListener(listener) {
        this.messageListeners.push(listener);
    }

    removeMessageListener(listener) {
        this.messageListeners = this.messageListeners.filter(
            (item) => item !== listener
        );
    }
}

const instance = new WebSocketInstance();
export default instance;
