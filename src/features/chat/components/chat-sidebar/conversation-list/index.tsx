import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useChatStore } from "@/features/chat/hooks/use-chat";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const ConversationList = () => {
  const { data: conversations } = api.conversations.getAll.useQuery();
  const searchParams = useSearchParams();
  const {
    setActiveConversation,
    clearNewMessageInput,
    newConversationVisitor,
    setShowDetail,
  } = useChatStore((state) => ({
    setActiveConversation: state.setActiveConversation,
    clearNewMessageInput: state.clearNewMessageInput,
    newConversationVisitor: state.newConversationVisitor,
    setShowDetail: state.setShowDetail,
  }));
  const activeConversation = useChatStore((state) => state.activeConversation);

  const newConversation = searchParams.has("new");

  return (
    <div className="flex flex-col">
      {newConversationVisitor && (
        <Link
          href="/chat?new"
          onClick={() => {
            setActiveConversation(null);
            setShowDetail(true);
            clearNewMessageInput();
          }}
          className={cn(
            "flex items-center gap-4 border-b p-2 hover:cursor-pointer hover:bg-secondary",
            (newConversation || !activeConversation) && "bg-secondary",
          )}
        >
          <Avatar>
            <AvatarFallback className="border bg-background text-sm">
              {newConversationVisitor.name
                ? newConversationVisitor.name.length > 0 &&
                  newConversationVisitor.name[0]?.toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
          <p>New Conversation</p>
        </Link>
      )}
      {conversations?.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/chat?conversation=${conversation.id}`}
          onMouseDown={() => {
            setActiveConversation(conversation);
            clearNewMessageInput();
            setShowDetail(true);
          }}
          className={cn(
            "flex items-center gap-4 border-b p-2 hover:cursor-pointer hover:bg-secondary",
            conversation.id === activeConversation?.id && "md:bg-secondary",
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
