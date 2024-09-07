"use client";

import { ConversationDetail } from "./conversation-detail";
import { ChatSidebar } from "./chat-sidebar";
import { useSync } from "../hooks/use-sync";

export const Chat = () => {
  useSync();
  return (
    <div className="flex h-full w-full">
      <ChatSidebar />
      <ConversationDetail />
    </div>
  );
};
