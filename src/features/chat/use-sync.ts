import { useChatStore } from "@/features/chat/use-chat";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

// This hook syncs the active conversation with the URL
export function useSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const conversationId = searchParams.get("conversation");
  const isInitialRender = useRef(true);

  const { setActiveConversation, conversations, focusNewConversaationInput } =
    useChatStore((state) => ({
      conversations: state.conversations,
      setActiveConversation: state.setActiveConversation,
      focusNewConversaationInput: state.focusNewConversationInput,
    }));

  useEffect(() => {
    console.log("syncing conversation with url");
    const syncConversationWithUrl = async () => {
      if (conversationId) {
        const conversation = conversations.find(
          (conv) => conv.id === conversationId,
        );
        setActiveConversation(conversation ?? conversations[0] ?? null);
      } else {
        setActiveConversation(null);
        setTimeout(() => focusNewConversaationInput(), 0);
      }
      isInitialRender.current = false;
    };
    void syncConversationWithUrl();
  }, [
    conversationId,
    router,
    conversations,
    setActiveConversation,
    focusNewConversaationInput,
  ]);
}
