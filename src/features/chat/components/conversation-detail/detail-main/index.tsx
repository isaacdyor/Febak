import { useChatStore } from "@/features/chat/hooks/use-chat";
import { Messages } from "./messages";
import { NewMessageInput } from "./new-message-input";

export const DetailMain = () => {
  const { activeConversation, newConversationVisitor } = useChatStore(
    (state) => ({
      activeConversation: state.activeConversation,
      newConversationVisitor: state.newConversationVisitor,
    }),
  );

  const showContent =
    activeConversation !== null || newConversationVisitor !== null;

  return (
    <div className="flex h-full flex-col px-4 py-4 md:px-8">
      {showContent && (
        <>
          <div className="flex-grow overflow-y-auto">
            <Messages />
          </div>
          <div className="mt-auto pt-2">
            <NewMessageInput />
          </div>
        </>
      )}
    </div>
  );
};
