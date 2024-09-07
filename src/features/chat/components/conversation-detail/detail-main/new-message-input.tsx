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
    addConversation,
  } = useChatStore((state) => ({
    activeConversation: state.activeConversation,
    setNewMessageInputRef: state.setNewMessageInputRef,
    updateActiveConversation: state.updateActiveConversation,
    addConversation: state.addConversation,
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
      addConversation(optimisticConversation);

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
