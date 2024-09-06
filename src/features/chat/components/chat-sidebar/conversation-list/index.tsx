import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useChatStore } from "@/features/chat/use-chat";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";

export const ConversationList = () => {
  const conversations = useChatStore((state) => state.conversations);
  // const { data: conversations } = api.conversations.getAll.useQuery();
  const setActiveConversation = useChatStore(
    (state) => state.setActiveConversation,
  );
  const activeConversation = useChatStore((state) => state.activeConversation);

  const activeConversationExists = conversations?.some(
    (conv) => conv.id === activeConversation?.id,
  );

  console.log(activeConversationExists);

  return (
    <div className="flex flex-col">
      {!activeConversationExists && activeConversation && (
        <div className="flex items-center gap-4 bg-secondary p-2">
          <Avatar>
            <AvatarFallback className="border bg-background text-sm">
              {activeConversation.visitor.name
                ? activeConversation.visitor.name.length > 0 &&
                  activeConversation.visitor.name[0]?.toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>

          <p>New Conversation</p>
        </div>
      )}
      {conversations?.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/chat?conversation=${conversation.id}`}
          onClick={() => setActiveConversation(conversation)}
          className={cn(
            "flex items-center gap-4 border-b p-2 hover:cursor-pointer hover:bg-secondary",
            conversation.id === activeConversation?.id && "bg-secondary",
          )}
        >
          <Avatar>
            <AvatarFallback className="border bg-background text-sm">
              {conversation.visitor.name
                ? conversation.visitor.name.length > 0 &&
                  conversation.visitor.name[0]?.toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="">{conversation.visitor.name ?? "Unknown"}</p>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>

            <p className="text-sm text-muted-foreground">
              {conversation.messages[conversation.messages.length - 1]!.content}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
