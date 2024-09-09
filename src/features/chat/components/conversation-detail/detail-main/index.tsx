import React from "react";
import { useChatStore } from "@/features/chat/hooks/use-chat";
import { Messages } from "./messages";
import { NewMessageInput } from "./new-message-input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export const DetailMain = () => {
  const { activeConversation, newConversationVisitor } = useChatStore(
    (state) => ({
      activeConversation: state.activeConversation,
      newConversationVisitor: state.newConversationVisitor,
    }),
  );

  const showContent =
    activeConversation !== null || newConversationVisitor !== null;

  const createConversationMutation = api.conversations.create.useMutation();

  return (
    <div className="flex h-full flex-col justify-end gap-4 px-8 py-4">
      <Button
        onClick={() => {
          createConversationMutation.mutate({
            userId: "eff994ee-475f-4d02-9f10-73378011410d",
            visitorId: "3ec68ad2-c92b-4940-9e24-ccf8163ae6b5",
          });
        }}
      >
        Create me a new conversation please
      </Button>
      {showContent && (
        <>
          <Messages />
          <NewMessageInput />
        </>
      )}
    </div>
  );
};
