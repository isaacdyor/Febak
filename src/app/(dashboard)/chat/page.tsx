import { ChatStoreProvider } from "@/features/chat/chat-provider";
import { Chat } from "@/features/chat/components";
import { api } from "@/trpc/server";

export default async function ChatPage() {
  const activeVisitors = (await api.visitors.getActive()) ?? [];
  const conversations = (await api.conversations.getAll()) ?? [];

  return (
    <ChatStoreProvider
      activeVisitors={activeVisitors}
      conversations={conversations}
    >
      <Chat />
    </ChatStoreProvider>
  );
}
