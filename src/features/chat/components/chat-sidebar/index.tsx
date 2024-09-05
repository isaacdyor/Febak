import { ConversationList } from "./conversation-list";
import { ConversationMenu } from "./conversation-menu";

export const ChatSidebar = () => {
  return (
    <div className="flex w-96 flex-col border-r">
      <ConversationMenu />
      <ConversationList />
    </div>
  );
};
