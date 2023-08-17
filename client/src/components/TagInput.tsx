import Autocomplete from "@mui/joy/Autocomplete";
import { useState } from "react";
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
      />
      <button onClick={handleAddTag}>Add Tag</button>
    </>
  );
};

export default TagInput;
