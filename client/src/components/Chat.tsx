import { useState } from "react";
import Tags from "../components/Tags";
interface Imessage {
  id?: number;
  text: string;
  tags: string[];
}
interface ChatProps {
  messages: Imessage[];
  onSendMessage: (message: Imessage) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
  const [messageText, setMessageText] = useState("");
  const [messageTags, setMessageTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      const tags = messageText.match(/#[a-z]+/gi);
      onSendMessage({ text: messageText, tags: tags ? tags : [] });
      setMessageText("");
    }
  };

  const handleAddTag = (tag: string) => {
    setMessageTags([...messageTags, tag]);
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = messageTags.filter((tag) => tag !== tagToDelete);
    setMessageTags(updatedTags);
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const handleDeselectTag = (tag: string) => {
    const updatedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );
    setSelectedTags(updatedTags);
  };

  return (
    <>
      <Tags
        tags={messageTags}
        selectedTags={selectedTags}
        onAddTag={handleAddTag}
        onDeleteTag={handleDeleteTag}
        onSelectTag={handleSelectTag}
        onDeselectTag={handleDeselectTag}
      />

      <div className="chat">
        <div className="message-form">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Chat;
