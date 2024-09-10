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
    <div className="flex grow flex-col justify-end overflow-hidden">
      <div className="scrollbar-hide flex flex-col gap-3 overflow-y-auto">
        {groupedMessages.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={cn(
              "flex flex-col",
              group[0]?.sentByUser ? "items-start" : "items-end",
            )}
          >
            {group.map((message, messageIndex) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[80%] rounded-md px-2 py-1",
                  message.sentByUser
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground",
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
    </div>
  );
};
