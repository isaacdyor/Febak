import React from "react";
import { useChatStore } from "@/features/chat/hooks/use-chat";
import { Messages } from "./messages";
import { NewMessageInput } from "./new-message-input";
import { Button } from "@/components/ui/button";

export const DetailMain = () => {
  const { activeConversation, newConversationVisitor } = useChatStore(
    (state) => ({
      activeConversation: state.activeConversation,
      newConversationVisitor: state.newConversationVisitor,
    }),
  );

  const showContent =
    activeConversation !== null || newConversationVisitor !== null;

  return (
    <div className="flex h-full flex-col justify-end gap-4 px-8 py-4">
      <Button></Button>
      {showContent && (
        <>
          <Messages />
          <NewMessageInput />
        </>
      )}
    </div>
  );
};
