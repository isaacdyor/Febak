import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import { useState } from "react";

export const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      console.log(message);
      setMessage("");
    }
  };

  return (
    <AutosizeTextarea
      // ref={inputRef}
      style={{ height: "38px" }}
      minHeight={10}
      maxHeight={100}
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyDown={handleEnter}
    />
  );
};
