import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import ChatPanel from "./components/Chat";
import WebSocketClient from "./components/WebSocket";
import axios from "axios";
interface Imessage {
  id?: number;
  text: string;
  tags: string;
}
function App() {
  const [messages, setMessages] = useState<Imessage[]>([]);
  useEffect(() => {
    handleGetMessage();
  }, []);
  const handleNewMessage = (message: Imessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = async (message: Imessage) => {
    try {
      await axios.post<Imessage>("http://localhost:4000/messages", message);
    } catch (error) {
      console.error(error);
    }
  };
  const handleGetMessage = async () => {
    try {
      const response = await axios.get<Imessage[]>(
        "http://localhost:4000/messages"
      );
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
      <WebSocketClient onMessageReceived={handleNewMessage} />
    </div>
  );
}

export default App;
