import { useChatStore } from "@/features/chat/hooks/use-chat";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// This hook syncs the active conversation with the URL
export function useSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const conversationId = searchParams.get("conversation");
  const newConversation = searchParams.has("new");
  const searchConversation = searchParams.has("search");

  const { setActiveConversation, conversations, focusNewConversationInput } =
    useChatStore((state) => ({
      conversations: state.conversations,
      setActiveConversation: state.setActiveConversation,
      focusNewConversationInput: state.focusNewConversationInput,
    }));

  useEffect(() => {
    const syncConversationWithUrl = async () => {
      if (conversationId) {
        const conversation = conversations.find(
          (conv) => conv.id === conversationId,
        );
        setActiveConversation(conversation ?? conversations[0] ?? null);
      } else if (
        (!newConversation && searchConversation) ||
        conversations.length === 0
      ) {
        setActiveConversation(null);
        setTimeout(() => focusNewConversationInput(), 0);
      } else {
        setActiveConversation(conversations[0] ?? null);
      }
    };
    void syncConversationWithUrl();
  }, [
    conversationId,
    router,
    conversations,
    newConversation,
    setActiveConversation,
    focusNewConversationInput,
    searchConversation,
  ]);
}
