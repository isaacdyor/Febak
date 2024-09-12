import { ChatStoreProvider } from "@/features/chat/chat-provider";
import { Chat } from "@/features/chat/components";
import { api, HydrateClient } from "@/trpc/server";

export default async function ChatPage() {
  await api.visitors.getActive.prefetch();
  await api.conversations.getAll.prefetch();

  return (
    <HydrateClient>
      <ChatStoreProvider>
        <Chat />
      </ChatStoreProvider>
    </HydrateClient>
  );
}
