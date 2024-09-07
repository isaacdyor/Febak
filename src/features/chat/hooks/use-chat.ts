"use client";

import { useContext } from "react";
import { useStore } from "zustand";
import { ChatStoreContext } from "@/features/chat/chat-provider";
import { type ChatState } from "@/features/chat/chat-store";

export function useChatStore<T>(selector: (state: ChatState) => T): T {
  const store = useContext(ChatStoreContext);
  if (!store) throw new Error("Missing ChatStoreProvider in the tree");
  return useStore(store, selector);
}
