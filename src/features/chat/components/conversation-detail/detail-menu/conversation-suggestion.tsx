import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useChatStore } from "@/features/chat/hooks/use-chat";
import { type Visitor } from "@/server/db/types";
import { useRouter } from "next/navigation";

export const ConversationSuggestion: React.FC<{ visitor: Visitor }> = ({
  visitor,
}) => {
  const { setNewConversationVisitor, setActiveConversation } = useChatStore(
    (state) => ({
      setNewConversationVisitor: state.setNewConversationVisitor,
      setActiveConversation: state.setActiveConversation,
    }),
  );

  const router = useRouter();

  return (
    <div
      onMouseDown={() => {
        setTimeout(() => {
          setActiveConversation(null);
          setNewConversationVisitor(visitor);
        }, 0);
        router.push("/chat?new");
      }}
      className="flex items-center gap-2 border-b p-2 hover:cursor-pointer hover:bg-secondary"
    >
      <Avatar className="h-6 w-6">
        <AvatarFallback className="border bg-background text-sm">
          {visitor.name
            ? visitor.name.length > 0 && visitor.name[0]?.toUpperCase()
            : "U"}
        </AvatarFallback>
      </Avatar>

      <p>{visitor.name ?? "Unknown"}</p>
      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
    </div>
  );
};
