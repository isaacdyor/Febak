import { useChatStore } from "@/features/chat/hooks/use-chat";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// This hook syncs the active conversation with the URL
export function useSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const conversationId = searchParams.get("conversation");
  const newConversation = searchParams.has("new");
  const searchConversation = searchParams.has("search");

  const {
    setActiveConversation,

    focusNewConversationInput,
    newConversationVisitor,
  } = useChatStore((state) => ({
    setActiveConversation: state.setActiveConversation,
    focusNewConversationInput: state.focusNewConversationInput,
    newConversationVisitor: state.newConversationVisitor,
  }));

  const { data: conversations } = api.conversations.getAll.useQuery();

  useEffect(() => {
    const syncConversationWithUrl = async () => {
      if (conversationId) {
        const conversation = conversations?.find(
          (conv) => conv.id === conversationId,
        );
        setActiveConversation(conversation ?? conversations?.[0] ?? null);
      } else if (newConversation) {
        if (newConversationVisitor) {
          setActiveConversation(null);
        } else {
          router.push("/chat");
          setActiveConversation(conversations?.[0] ?? null);
        }
      } else if (searchConversation || conversations?.length === 0) {
        setActiveConversation(null);
        setTimeout(() => focusNewConversationInput(), 0);
      } else {
        if (window.innerWidth > 768) {
          setActiveConversation(conversations?.[0] ?? null);
        }
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
    newConversationVisitor,
  ]);
}
