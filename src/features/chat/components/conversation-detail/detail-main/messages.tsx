import { useChatStore } from "@/features/chat/hooks/use-chat";
import { cn } from "@/lib/utils";

export const Messages = () => {
  const activeConversation = useChatStore((state) => state.activeConversation);
  if (!activeConversation) return null;
  return (
    <div className="flex w-full flex-col gap-2">
      {activeConversation.messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.sentByUser ? "justify-end" : "justify-start",
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-md px-2 py-1",
              message.sentByUser
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
