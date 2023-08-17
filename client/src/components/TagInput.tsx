import Autocomplete from "@mui/joy/Autocomplete";
import { useState } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";

interface TagsInputProps {
  addNewTag: (tag: string) => void;
  allTags: string[];
}
const TagInput: React.FC<TagsInputProps> = ({ addNewTag, allTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (_, v: string) => {
    setInputValue(v);
  };

  const handleAddTag = () => {
    addNewTag(inputValue);
    setInputValue("");
  };

  return (
    <>
      <Autocomplete
        options={allTags}
        value={inputValue}
        freeSolo
        onInputChange={handleInputChange}
        className="add-hashtag"
        placeholder="#tag..."
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.defaultMuiPrevented = true;
            handleAddTag();
          }
        }}
      />
      <div className="input-group-prepend add-button">
        <span className="input-group-text">
          <PlusCircleFill onClick={handleAddTag} color="black" size={26} />
        </span>
      </div>
    </>
  );
};

export default TagInput;
