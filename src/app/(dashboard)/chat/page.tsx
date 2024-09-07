import { Chat } from "@/features/chat/components";
import { ChatStoreProvider } from "@/features/chat/chat-provider";
import { api } from "@/trpc/server";

export default async function ChatPage() {
  const activeVisitors = (await api.visitors.getActive()) ?? [];
  const conversations = (await api.conversations.getAll()) ?? [];
  void api.visitors.getActive.prefetch();
  await api.conversations.getAll.prefetch();

  return (
    <ChatStoreProvider
      activeVisitors={activeVisitors}
      conversations={conversations}
    >
      <Chat />
    </ChatStoreProvider>
  );
}
