import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateConversation } from "@/features/chat/utils/generateConversation";
import { type Visitor } from "@/server/db/types";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export const ConversationSuggestion: React.FC<{ visitor: Visitor }> = ({
  visitor,
}) => {
  const conversation = generateConversation(visitor, uuidv4());

  return (
    <Link
      href={`/chat?conversation=${conversation.id}&name=${visitor.name}`}
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
    </Link>
  );
};
