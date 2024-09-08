import {
  AutosizeTextarea,
  type AutosizeTextAreaRef,
} from "@/components/ui/autosize-text-area";
import { useChatStore } from "@/features/chat/hooks/use-chat";
import { generateConversation } from "@/features/chat/utils/generateConversation";
import { generateMessage } from "@/features/chat/utils/generateMessage";
import { type FullConversation } from "@/server/db/types";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const NewMessageInput = () => {
  const [message, setMessage] = useState("");
  const {
    activeConversation,
    setNewMessageInputRef,
    updateActiveConversation,
  } = useChatStore((state) => ({
    activeConversation: state.activeConversation,
    setNewMessageInputRef: state.setNewMessageInputRef,
    updateActiveConversation: state.updateActiveConversation,
  }));

  const router = useRouter();

  const utils = api.useUtils();

  const createConversation = api.conversations.create.useMutation({
    onMutate: async (newConversationInput) => {
      await utils.conversations.getAll.cancel();

      const previousConversations = utils.conversations.getAll.getData();

      const tempId = uuidv4();

      const message = generateMessage({
        conversationId: tempId,
        content: newConversationInput.messageContent,
      });

      const optimisticConversation = generateConversation({
        visitorId: newConversationInput.visitorId,
        messages: [message],
      });
      utils.conversations.getAll.setData(undefined, (old) => {
        // make sure currentConversations is an array
        const currentConversations = Array.isArray(old) ? old : [];
        return [optimisticConversation, ...currentConversations];
      });

      return { previousConversations };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.conversations.getAll.setData(undefined, ctx?.previousConversations);
    },
    async onSettled() {
      // Sync with server once mutation has settled
      router.push(`/chat?conversation=${activeConversation?.id}`);
      await utils.conversations.getAll.invalidate();
    },
  });

  const sendMessageMutation = api.messages.create.useMutation({
    onMutate: async (newMessageInput) => {
      await utils.conversations.getAll.cancel();

      const previousConversations = utils.conversations.getAll.getData();

      const tempId = uuidv4();

      const message = generateMessage({
        conversationId: tempId,
        content: newMessageInput.content,
      });

      utils.conversations.getAll.setData(undefined, (old) => {
        // Make sure currentConversations is an array
        const currentConversations = Array.isArray(old) ? old : [];

        // Find the conversation to update
        const updatedConversations = currentConversations.map(
          (conversation) => {
            if (conversation.id === newMessageInput.conversationId) {
              // Add the new message to the existing conversation
              return {
                ...conversation,
                messages: [...conversation.messages, message],
                updatedAt: new Date(), // Update the conversation's updatedAt timestamp
              };
            }
            return conversation;
          },
        );

        return updatedConversations;
      });
      return { previousConversations };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.conversations.getAll.setData(undefined, ctx?.previousConversations);
    },
    async onSettled() {
      // Sync with server once mutation has settled
      router.push(`/chat?conversation=${activeConversation?.id}`);
      await utils.conversations.getAll.invalidate();
    },
  });

  // assign the new inputref to the store
  const inputRef = useRef<AutosizeTextAreaRef>(null);
  useEffect(() => {
    setNewMessageInputRef(inputRef);
    return () => setNewMessageInputRef(null);
  }, [setNewMessageInputRef]);

  const callCreateConversation = async () => {
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

      router.push(`/chat?conversation=${fullConversation.id}`);
      setMessage("");
    }
  };

  const sendMessage = async () => {
    if (message.trim() && activeConversation) {
      sendMessageMutation.mutate({
        conversationId: activeConversation.id,
        content: message,
        sentByUser: true,
      });
    }
    setMessage("");
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (activeConversation?.messages.length === 0) {
        void callCreateConversation();
      } else {
        void sendMessage();
      }
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
