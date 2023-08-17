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
    <>
      <div className="tags-list">
        <div className="input-group">
          <TagInput addNewTag={handleAddTag} allTags={allTags} />
        </div>
        <ul className="list-unstyled chat-list mt-2 mb-0">
          {userTags.map((tag: string, index: number) => (
            <li className="d-flex justify-content-between" key={index}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedTags.includes(tag)}
                  id={tag}
                  onChange={() => {
                    if (selectedTags.includes(tag)) {
                      onDeselectTag(tag);
                    } else {
                      onSelectTag(tag);
                    }
                  }}
                />
                <label key={tag} htmlFor={tag} className="tag-checkbox">
                  {tag}
                </label>
              </div>
              <span className="delete-icon" onClick={() => onDeleteTag(tag)}>
                <Trash color="black" size={25} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tags;
