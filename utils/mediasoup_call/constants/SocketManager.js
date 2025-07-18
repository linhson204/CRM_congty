import io from 'socket.io-client';

class SocketManager {
  constructor() {
    if (!SocketManager.instance) {
      this.socket = io("https://skvideocall.timviec365.vn", {
        transports: ["websocket"],
        autoConnect: true,
        reconnectionDelay: 500,
        reconnectionDelayMax: 1000,
        randomizationFactor: 0,
        reconnection: true,
        timeout: 30000,
        extraHeaders: {
          Connection: "Upgrade",
          Upgrade: "websocket",
          secure: true,
        },
      });
      SocketManager.instance = this;
    }
    return SocketManager.instance;
  }

  getSocket() {
    return this.socket;
  }
}

const instance = new SocketManager();
Object.freeze(instance);

export default instance;
