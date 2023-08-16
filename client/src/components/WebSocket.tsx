import { useEffect } from "react";

const WebSocketClient = ({ onMessageReceived }) => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessageReceived(message);
    };
    socket.onerror = (e) => {
      console.log(e);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return null;
};

export default WebSocketClient;
