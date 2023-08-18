import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { WSPops } from "../types/types";

const WebSocketClient: React.FC<WSPops> = ({
  onMessageReceived,
  setUserId,
}) => {
  useEffect(() => {
    const socket = new WebSocket("wss://online-chat-sayu.onrender.com");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
      const userId = uuidv4();
      setUserId(userId);
      console.log(userId);
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
