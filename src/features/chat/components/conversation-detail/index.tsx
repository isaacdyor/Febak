import { cn } from "@/lib/utils";
import { useChatStore } from "../../hooks/use-chat";
import { DetailMain } from "./detail-main";
import { DetailMenu } from "./detail-menu";

export const ConversationDetail = () => {
  const { activeConversation } = useChatStore((state) => ({
    activeConversation: state.activeConversation,
  }));
  return (
    <div
      className={cn(
        "flex w-full flex-col",
        !activeConversation && "hidden md:flex",
      )}
    >
      <DetailMenu />
      <DetailMain />
    </div>
  );
};
