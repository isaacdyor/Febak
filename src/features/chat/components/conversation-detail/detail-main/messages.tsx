import React, { useEffect, useRef } from "react";
import { useChatStore } from "@/features/chat/hooks/use-chat";
import { cn } from "@/lib/utils";

export const Messages = () => {
  const activeConversation = useChatStore((state) => state.activeConversation);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  if (!activeConversation) return null;

  const groupedMessages = activeConversation.messages.reduce(
    (acc, message, index, array) => {
      if (index === 0 || message.sentByUser !== array[index - 1]?.sentByUser) {
        acc.push([message]);
      } else {
        acc[acc.length - 1]?.push(message);
      }
      return acc;
    },
    [] as (typeof activeConversation.messages)[],
  );

  return (
    <div className="scrollbar-hide flex w-full flex-col overflow-y-auto">
      {groupedMessages.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={cn(
            "flex flex-col",
            group[0]?.sentByUser ? "items-end" : "items-start",
            groupIndex !== groupedMessages.length - 1 && "mb-3",
          )}
        >
          {group.map((message, messageIndex) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[80%] rounded-md px-2 py-1",
                message.sentByUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
                messageIndex !== 0 && "mt-0.5",
              )}
            >
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
