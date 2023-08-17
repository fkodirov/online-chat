import { Trash } from "react-bootstrap-icons";
import TagInput from "./TagInput";

interface TagsProps {
  allTags: string[];
  userTags: string[];
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
  onSelectTag: (tag: string) => void;
  onDeselectTag: (tag: string) => void;
}

const Tags: React.FC<TagsProps> = ({
  allTags,
  userTags,
  selectedTags,
  onAddTag,
  onDeleteTag,
  onSelectTag,
  onDeselectTag,
}) => {
  const handleAddTag = (e: string) => {
    if (e.trim() !== "") {
      onAddTag(e);
    }
  };

  return (
    <div className="tag-block">
      <TagInput addNewTag={handleAddTag} allTags={allTags} />
      <div className="tags">
        {userTags.map((tag: string, index: number) => (
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
