// src/features/chat/chat-store-provider.tsx
"use client";

import React, { createContext, useRef } from "react";
import {
  type ChatStore,
  type ChatStoreProps,
  createChatStore,
} from "./chat-store";

export const ChatStoreContext = createContext<ChatStore | null>(null);

interface ChatStoreProviderProps extends ChatStoreProps {
  children: React.ReactNode;
}

export function ChatStoreProvider({
  children,
  ...props
}: ChatStoreProviderProps) {
  const storeRef = useRef<ChatStore>();
  if (!storeRef.current) {
    storeRef.current = createChatStore(props);
  }
  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
}
