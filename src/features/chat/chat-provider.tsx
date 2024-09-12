"use client";

import React, { createContext, useRef } from "react";
import { type ChatStore, createChatStore } from "./chat-store";

export const ChatStoreContext = createContext<ChatStore | null>(null);

export function ChatStoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<ChatStore>();
  if (!storeRef.current) {
    storeRef.current = createChatStore();
  }

  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
}
