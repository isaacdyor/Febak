import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { useChatStore } from "@/features/chat/use-chat";

export const ConversationMenu = () => {
  const { focusNewConversationInput } = useChatStore((state) => ({
    focusNewConversationInput: state.focusNewConversationInput,
  }));
  return (
    <div className="flex h-10 items-center gap-4 border-b p-2">
      <Input placeholder="Search conversation" className="h-6" />
      <Link onClick={focusNewConversationInput} href="/chat?search">
        <SquarePen className="h-5 w-5 shrink-0 text-muted-foreground hover:cursor-pointer" />
      </Link>
    </div>
  );
};
