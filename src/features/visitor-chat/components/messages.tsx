import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { type FullConversation } from "@/server/db/types";

export const Messages: React.FC<{ conversation: FullConversation }> = ({
  conversation,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const groupedMessages = conversation?.messages.reduce(
    (acc, message, index, array) => {
      if (index === 0 || message.sentByUser !== array[index - 1]?.sentByUser) {
        acc.push([message]);
      } else {
        acc[acc.length - 1]?.push(message);
      }
      return acc;
    },
    [] as (typeof conversation.messages)[],
  );

  return (
    <div className="scrollbar-hide flex flex-col overflow-y-auto">
      {groupedMessages.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={cn(
            "flex flex-col",
            group[0]?.sentByUser ? "items-start" : "items-end",
            groupIndex !== groupedMessages.length - 1 && "mb-3",
          )}
        >
          {group.map((message, messageIndex) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[80%] rounded-md px-2",
                message.sentByUser
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary text-primary-foreground",
                messageIndex !== 0 && "mt-0.5",
                messageIndex === group.length - 1 &&
                  groupIndex === groupedMessages.length - 1
                  ? "pb-1 pt-1"
                  : "py-1",
              )}
            >
              <p className="whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
