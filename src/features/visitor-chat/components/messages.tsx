import { cn } from "@/lib/utils";
import { type FullConversation } from "@/server/db/types";

export const Messages: React.FC<{ conversation: FullConversation }> = ({
  conversation,
}) => {
  return (
    <div className="flex flex-col">
      {conversation?.messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.sentByUser ? "justify-start" : "justify-end",
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-md px-2 py-1",
              message.sentByUser
                ? "bg-secondary text-secondary-foreground"
                : "bg-primary text-primary-foreground",
            )}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
