"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { ChatInput } from "./chat-input";
import { Messages } from "./messages";

export const VisitorChat = () => {
  return (
    <div className="fixed bottom-2 left-2 z-40 flex h-80 w-60 flex-col rounded-md border bg-background">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="border bg-background text-sm">
              ID
            </AvatarFallback>
          </Avatar>
          <p>Isaac Dyor</p>
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        </div>
        <X className="rounded-full p-1 hover:cursor-pointer hover:bg-secondary" />
      </div>
      <div className="flex h-full flex-col justify-end gap-2 p-4">
        <Messages />
        <ChatInput />
      </div>
    </div>
  );
};
