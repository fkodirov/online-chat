export interface Imessage {
  id?: number;
  text: string;
  tags: string;
  userId: string;
}
export interface ChatProps {
  messages: Imessage[];
  onSendMessage: (message: Imessage) => void;
  userId: string;
}
export interface TagsInputProps {
  addNewTag: (tag: string) => void;
  allTags: string[];
}
export interface WSPops {
  onMessageReceived: (message: Imessage) => void;
  setUserId: (value: string) => void;
}
export interface TagsProps {
  allTags: string[];
  userTags: string[];
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
  onSelectTag: (tag: string) => void;
  onDeselectTag: (tag: string) => void;
}
