"use client";

import { ConversationDetail } from "./conversation-detail";
import { ChatSidebar } from "./chat-sidebar";

export const Chat = () => {
  return (
    <div className="flex h-full w-full">
      <ChatSidebar />
      <ConversationDetail />
    </div>
  );
};
