import { useState, useEffect, useRef } from "react";
import Tags from "../components/Tags";
import axios from "axios";
import { SendFill } from "react-bootstrap-icons";
import { ChatProps } from "../types/types";

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage, userId }) => {
  const [messageText, setMessageText] = useState("");
  const [messageTags, setMessageTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const messageListRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      const list = messageListRef.current;
      list.scrollTop = list.scrollHeight - list.clientHeight;
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      const tags = messageText.match(/#[а-яёА-ЯЁa-zA-Z0-9_]+/gi)?.join(",");
      onSendMessage({ text: messageText, tags: tags ? tags : "", userId });
      setMessageText("");
      fetchTags();
    }
  };

  const handleAddTag = (tag: string) => {
    let getTag = tag.trim();
    if (getTag[0] != "#") {
      getTag = "#" + getTag;
    }
    setMessageTags([...messageTags, getTag]);
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = messageTags.filter((tag) => tag !== tagToDelete);
    setMessageTags(updatedTags);
    setSelectedTags(updatedTags);
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

  const fetchTags = async () => {
    try {
      const response = await axios.get<string[]>(
        "https://online-chat-sayu.onrender.com/tags"
      );
      setAllTags(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Tags
        allTags={allTags}
        userTags={messageTags}
        selectedTags={selectedTags}
        onAddTag={handleAddTag}
        onDeleteTag={handleDeleteTag}
        onSelectTag={handleSelectTag}
        onDeselectTag={handleDeselectTag}
      />
      <div className="chat vh-90">
        <div className="chat-history vh-80 overflow-hidden">
          <ul
            className="m-b-0 vh-75 overflow-auto scroll-block"
            ref={messageListRef}
          >
            {selectedTags.length === 0
              ? messages.map((message) => (
                  <li key={message.id} className="clearfix p-3">
                    <div
                      className={`message  ${
                        message.userId === userId
                          ? "my-message"
                          : "other-message float-right"
                      }`}
                    >
                      {message.text}
                    </div>
                  </li>
                ))
              : messages
                  .filter((message) => {
                    const messagetag = message.tags.split(",");
                    return messagetag.some(
                      (tag) => selectedTags.includes(tag) || tag === ""
                    );
                  })
                  .map((message) => (
                    <li key={message.id} className="clearfix p-3">
                      <div
                        className={`message  ${
                          message.userId === userId
                            ? "my-message"
                            : "other-message float-right"
                        }`}
                      >
                        {message.text}
                      </div>
                    </li>
                  ))}
          </ul>
        </div>
        <div className="chat-message clearfix">
          <div className="input-group mb-0">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <SendFill onClick={handleSendMessage} color="black" size={25} />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter text here..."
              value={messageText}
              onKeyDown={handleKeyDown}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
