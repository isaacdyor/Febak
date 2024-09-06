import { useChatStore } from "@/features/chat/use-chat";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// This hook syncs the active conversation with the URL
export function useSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const conversationId = searchParams.get("conversation");

  const { setActiveConversation, activeConversation, conversations } =
    useChatStore((state) => ({
      conversations: state.conversations,
      setActiveConversation: state.setActiveConversation,
      activeConversation: state.activeConversation,
    }));

  useEffect(() => {
    const syncConversationWithUrl = async () => {
      if (conversationId) {
        const conversation = conversations.find(
          (conv) => conv.id === conversationId,
        );
        console.log(conversation ?? conversations[0] ?? null);
        setActiveConversation(conversation ?? conversations[0] ?? null);
      } else if (activeConversation) {
        setActiveConversation(null);
      }
    };
    void syncConversationWithUrl();
  }, [
    conversationId,
    activeConversation,
    router,
    conversations,
    setActiveConversation,
  ]);
}
