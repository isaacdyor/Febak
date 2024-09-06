import {
  AutosizeTextarea,
  type AutosizeTextAreaRef,
} from "@/components/ui/autosize-text-area";
import { useChatStore } from "@/features/chat/use-chat";
import { type FullConversation } from "@/server/db/types";
import { api } from "@/trpc/react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const NewMessageInput = () => {
  const [message, setMessage] = useState("");
  const {
    activeConversation,
    setNewMessageInputRef,
    updateActiveConversation,
    addConversation,
  } = useChatStore((state) => ({
    activeConversation: state.activeConversation,
    setNewMessageInputRef: state.setNewMessageInputRef,
    updateActiveConversation: state.updateActiveConversation,
    addConversation: state.addConversation,
  }));

  const utils = api.useUtils();
  const createConversation = api.conversations.create.useMutation({
    onMutate: async (newConversationInput) => {
      await utils.conversations.getAll.cancel();

      const previousConversations = utils.conversations.getAll.getData();

      const tempId = uuidv4();
      const now = new Date();

      const optimisticConversation = {
        id: tempId,
        userId: newConversationInput.userId,
        visitorId: newConversationInput.visitorId,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [
          {
            id: uuidv4(),
            conversationId: tempId,
            content: newConversationInput.messageContent,
            createdAt: new Date(),
            sentByUser: true,
          },
        ],
        visitor: {
          id: newConversationInput.visitorId,
          name: null, // We don't have this information, so we set it to null
          userId: newConversationInput.userId,
          active: true, // Assuming the visitor is active when creating a conversation
          currentPage: null, // We don't have this information
          lastSeen: now,
          createdAt: now,
        },
      };

      utils.conversations.getAll.setData(undefined, (previousConversations) =>
        previousConversations
          ? [...previousConversations, optimisticConversation]
          : [optimisticConversation],
      );
      return { previousConversations };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.conversations.getAll.setData(undefined, ctx?.previousConversations);
    },
    async onSettled() {
      // Sync with server once mutation has settled
      await utils.conversations.getAll.invalidate();
    },
  });

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
      const result = await createConversation.mutateAsync({
        userId: activeConversation.userId,
        visitorId: activeConversation.visitorId,
        messageContent: message,
      });
      const fullConversation: FullConversation = {
        ...result,
        visitor: activeConversation.visitor,
      };

      updateActiveConversation(fullConversation);
      addConversation(fullConversation);
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
