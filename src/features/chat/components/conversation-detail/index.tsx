import { DetailMain } from "./detail-main";
import { DetailMenu } from "./detail-menu";

export const ConversationDetail = () => {
  return (
    <div className="flex w-full flex-col">
      <DetailMenu />
      <DetailMain />
    </div>
  );
};
