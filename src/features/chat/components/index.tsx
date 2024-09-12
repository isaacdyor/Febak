"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useRealtime } from "../hooks/use-realtime";
import { useSync } from "../hooks/use-sync";
import { ChatSidebar } from "./chat-sidebar";
import { ConversationDetail } from "./conversation-detail";

export const Chat = () => {
  useSync();
  useRealtime();

  return (
    <div className="flex h-full w-full">
      <ChatSidebar />
      <ConversationDetail />
    </div>
  );
};
