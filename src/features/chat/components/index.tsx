"use client";

import { ConversationDetail } from "./conversation-detail";
import { ChatSidebar } from "./chat-sidebar";
import { useSync } from "../use-sync";

export const Chat = () => {
  useSync();
  return (
    <div className="flex h-full w-full">
      <ChatSidebar />
      <ConversationDetail />
    </div>
  );
};
