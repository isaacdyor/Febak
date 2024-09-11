import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { useChatStore } from "@/features/chat/hooks/use-chat";

export const ConversationMenu = () => {
  const { focusNewConversationInput, setActiveConversation, setShowDetail } =
    useChatStore((state) => ({
      focusNewConversationInput: state.focusNewConversationInput,
      setActiveConversation: state.setActiveConversation,
      setShowDetail: state.setShowDetail,
    }));
  return (
    <div className="flex h-10 items-center gap-4 border-b p-2">
      <Input placeholder="Search conversation" className="h-6" />
      <Link
        onClick={() => {
          setActiveConversation(null);
          setShowDetail(true);
          setTimeout(() => {
            focusNewConversationInput();
          }, 0);
        }}
        href="/chat?search"
      >
        <SquarePen className="h-5 w-5 shrink-0 text-muted-foreground hover:cursor-pointer" />
      </Link>
    </div>
  );
};
