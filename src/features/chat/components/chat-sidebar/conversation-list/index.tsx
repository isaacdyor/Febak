import { useChatStore } from "@/features/chat/use-chat";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export const ConversationList = () => {
  const conversations = useChatStore((state) => state.conversations);
  console.log(conversations);
  return (
    <div className="flex flex-col">
      {conversations.map((conversation) => (
        <div key={conversation.id} className="flex items-center gap-4 p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-background border text-sm">
              {conversation.visitor.name
                ? conversation.visitor.name.length > 0 &&
                  conversation.visitor.name[0]?.toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">
              {conversation.visitor.name ?? "Unknown"}
            </span>
            <span className="text-muted-foreground text-sm">
              {conversation.messages[conversation.messages.length - 1]!.content}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
