import { cn } from "@/lib/utils";
import { useChatStore } from "../../hooks/use-chat";
import { ConversationList } from "./conversation-list";
import { ConversationMenu } from "./conversation-menu";

export const ChatSidebar = () => {
  const { showDetail } = useChatStore((state) => ({
    showDetail: state.showDetail,
  }));

  return (
    <div
      className={cn(
        "flex w-full flex-col border-r md:w-96",
        showDetail && "hidden md:flex",
      )}
    >
      <ConversationMenu />
      <ConversationList />
    </div>
  );
};
