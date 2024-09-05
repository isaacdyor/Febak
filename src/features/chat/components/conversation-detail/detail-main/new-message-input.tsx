import {
  AutosizeTextarea,
  type AutosizeTextAreaRef,
} from "@/components/ui/autosize-text-area";
import { useChatStore } from "@/features/chat/use-chat";
import { api } from "@/trpc/react";
import { useEffect, useRef, useState } from "react";

export const NewMessageInput = () => {
  const [message, setMessage] = useState("");
  const activeConversation = useChatStore((state) => state.activeConversation);
  const setNewMessageInputRef = useChatStore(
    (state) => state.setNewMessageInputRef,
  );
  const updateActiveConversation = useChatStore(
    (state) => state.updateActiveConversation,
  );

  const addConversation = useChatStore((state) => state.addConversation);

  const createConversation = api.conversations.create.useMutation();

  const inputRef = useRef<AutosizeTextAreaRef>(null);

  useEffect(() => {
    setNewMessageInputRef(inputRef);
    return () => setNewMessageInputRef(null);
  }, [setNewMessageInputRef]);

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  const sendMessage = async () => {
    if (message.trim() && activeConversation) {
      const conversation = await createConversation.mutateAsync({
        userId: activeConversation.userId,
        visitorId: activeConversation.visitorId,
        messageContent: message,
      });
      updateActiveConversation(conversation.conversation);

      setMessage("");
    }
  };

  return (
    <>
      {activeConversation && (
        <AutosizeTextarea
          ref={inputRef}
          style={{ height: "38px" }}
          minHeight={10}
          maxHeight={100}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleEnter}
        />
      )}
    </>
  );
};
