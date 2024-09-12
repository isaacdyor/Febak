"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, X } from "lucide-react";
import { ChatInput } from "./chat-input";
import { Messages } from "./messages";
import { api } from "@/trpc/react";
import { type AutosizeTextAreaRef } from "@/components/ui/autosize-text-area";

export const VisitorChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<AutosizeTextAreaRef>(null);

  const [visitorId, setVisitorId] = useState<string | null>(null);
  useEffect(() => {
    const storedVisitorId =
      typeof window !== "undefined" ? localStorage.getItem("visitorId") : null;
    setVisitorId(storedVisitorId);
  }, []);
  const { data: conversation } = api.conversations.getByVisitorId.useQuery(
    {
      visitorId: visitorId ?? "",
    },
    { enabled: !!visitorId },
  );

  return (
    conversation && (
      <div className="fixed bottom-2 left-2 z-50">
        {isOpen ? (
          <div className="flex h-[400px] w-96 flex-col rounded-md border bg-background">
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
              <X
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:cursor-pointer hover:bg-secondary"
              />
            </div>
            <div className="flex h-full flex-col justify-end gap-2 overflow-hidden p-4">
              <Messages conversation={conversation} />
              <ChatInput conversation={conversation} inputRef={inputRef} />
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
            className="rounded-full bg-secondary p-3 hover:cursor-pointer"
          >
            <MessageCircle className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>
    )
  );
};
