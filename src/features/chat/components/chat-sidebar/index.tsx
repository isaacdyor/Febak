import { cn } from "@/lib/utils";
import { useChatStore } from "../../hooks/use-chat";
import { ConversationList } from "./conversation-list";
import { ConversationMenu } from "./conversation-menu";

export const ChatSidebar = () => {
  const { activeConversation } = useChatStore((state) => ({
    activeConversation: state.activeConversation,
  }));
  return (
    <div
      className={cn(
        "flex w-96 flex-col border-r",
        activeConversation && "hidden md:flex",
      )}
    >
      <ConversationMenu />
      <ConversationList />
    </div>
  );
};
