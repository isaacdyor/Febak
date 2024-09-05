import { useChatStore } from "@/features/chat/use-chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const ConversationList = () => {
  const conversations = useChatStore((state) => state.conversations);
  const setActiveConversation = useChatStore(
    (state) => state.setActiveConversation,
  );
  const activeConversation = useChatStore((state) => state.activeConversation);

  return (
    <div className="flex flex-col">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => setActiveConversation(conversation)}
          className={cn(
            "hover:bg-secondary flex items-center gap-4 border-b p-2 hover:cursor-pointer",
            conversation.id === activeConversation?.id && "bg-secondary",
          )}
        >
          <Avatar>
            <AvatarFallback className="bg-background border text-sm">
              {conversation.visitor.name
                ? conversation.visitor.name.length > 0 &&
                  conversation.visitor.name[0]?.toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">
                {conversation.visitor.name ?? "Unknown"}
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>

            <p className="text-muted-foreground text-sm">
              {conversation.messages[conversation.messages.length - 1]!.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
