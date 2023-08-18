import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import ChatPanel from "./components/Chat";
import WebSocketClient from "./components/WebSocket";
import axios from "axios";
import { Imessage } from "./types/types";

function App() {
  const [messages, setMessages] = useState<Imessage[]>([]);
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    handleGetMessage();
  }, []);
  const handleNewMessage = (message: Imessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = async (message: Imessage) => {
    try {
      await axios.post<Imessage>(
        "https://online-chat-sayu.onrender.com/messages",
        message
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleGetMessage = async () => {
    try {
      const response = await axios.get<Imessage[]>(
        "https://online-chat-sayu.onrender.com/messages"
      );
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const setId = (id: string) => {
    setUserId(id);
  };

  return (
    <div className="container-md">
      <div className="col-lg-12">
        <div className="card chat-app">
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            userId={userId}
          />
          <WebSocketClient
            onMessageReceived={handleNewMessage}
            setUserId={setId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
