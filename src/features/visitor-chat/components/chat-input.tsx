import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import { generateMessage } from "@/features/chat/utils/generateMessage";
import { type FullConversation } from "@/server/db/types";
import { api } from "@/trpc/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const ChatInput: React.FC<{ conversation: FullConversation }> = ({
  conversation,
}) => {
  const [message, setMessage] = useState("");
  const utils = api.useUtils();

  const sendMessageMutation = api.messages.create.useMutation({
    onMutate: async (newMessageInput) => {
      await utils.conversations.getAll.cancel();

      const previousConversations = utils.conversations.getAll.getData();

      const tempId = uuidv4();

      const newMessage = generateMessage({
        conversationId: tempId,
        content: newMessageInput.content,
        sentByUser: false,
      });

      utils.conversations.getByVisitorId.setData(
        { visitorId: conversation.visitorId },
        (old) => {
          if (!old) return undefined;

          if (old.id === newMessageInput.conversationId) {
            return {
              ...old,
              messages: [...old.messages, newMessage],
              updatedAt: new Date(),
            };
          }

          return old;
        },
      );

      return { previousConversations };
    },
    onError(err, newPost, ctx) {
      utils.conversations.getAll.setData(undefined, ctx?.previousConversations);
    },
    async onSettled() {
      await utils.conversations.getAll.invalidate();
    },
  });

  const sendMessage = async () => {
    if (message.trim()) {
      sendMessageMutation.mutate({
        conversationId: conversation.id,
        content: message,
        sentByUser: true,
      });
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
      setMessage("");
    }
  };

  return (
    <AutosizeTextarea
      style={{ height: "38px" }}
      minHeight={10}
      maxHeight={100}
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyDown={handleEnter}
    />
  );
};
