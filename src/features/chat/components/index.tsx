"use client";

import { useSync } from "../hooks/use-sync";
import { ChatSidebar } from "./chat-sidebar";
import { ConversationDetail } from "./conversation-detail";

export const Chat = () => {
  useSync();

  return (
    <div className="flex h-full w-full">
      <ChatSidebar />
      <ConversationDetail />
    </div>
  );
};
