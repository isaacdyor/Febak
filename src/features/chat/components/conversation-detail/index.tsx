import { cn } from "@/lib/utils";
import { useChatStore } from "../../hooks/use-chat";
import { DetailMain } from "./detail-main";
import { DetailMenu } from "./detail-menu";

export const ConversationDetail = () => {
  const { showDetail } = useChatStore((state) => ({
    showDetail: state.showDetail,
  }));

  return (
    <div
      className={cn(
        "flex w-full flex-col justify-end",
        !showDetail && "hidden md:flex",
      )}
    >
      <DetailMenu />
      <DetailMain />
    </div>
  );
};
