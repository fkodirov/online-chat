import { useState } from "react";
import { Trash } from "react-bootstrap-icons";
interface TagsProps {
  tags: string[];
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
  onSelectTag: (tag: string) => void;
  onDeselectTag: (tag: string) => void;
}

const Tags: React.FC<TagsProps> = ({
  tags,
  selectedTags,
  onAddTag,
  onDeleteTag,
  onSelectTag,
  onDeselectTag,
}) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      onAddTag(tagInput);
      setTagInput("");
    }
  };
  // const fetchTags = async () => {
  //   try {
  //     const response = await axios.get<string[]>("/tags");
  //     setTags(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="tag-input">
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        placeholder="Enter tags..."
      />
      <button onClick={handleAddTag}>Add Tag</button>
      <div className="tags">
        {tags.map((tag: string, index: number) => (
          <div key={index} className="tag">
            <label key={tag} className="tag-checkbox">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => {
                  if (selectedTags.includes(tag)) {
                    onDeselectTag(tag);
                  } else {
                    onSelectTag(tag);
                  }
                }}
              />
              {tag}
            </label>
            <span className="delete-icon" onClick={() => onDeleteTag(tag)}>
              <Trash color="black" size={22} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
