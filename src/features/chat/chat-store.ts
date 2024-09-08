// src/features/chat/chat-store.ts
"use client";

import { type AutosizeTextAreaRef } from "@/components/ui/autosize-text-area";
import { type FullConversation, type Visitor } from "@/server/db/types";
import { createStore } from "zustand";

export interface ChatState {
  activeVisitors: Visitor[];
  conversations: FullConversation[];
  activeConversation: FullConversation | null;
  newConversationInputRef: React.RefObject<HTMLInputElement> | null;
  newMessageInputRef: React.RefObject<AutosizeTextAreaRef> | null;
  setActiveVisitors: (visitors: Visitor[]) => void;
  setActiveConversation: (conversation: FullConversation | null) => void;
  updateActiveConversation: (updates: Partial<FullConversation>) => void;
  addActiveVisitor: (visitor: Visitor) => void;
  removeActiveVisitor: (visitorId: string) => void;
  setNewConversationInputRef: (
    ref: React.RefObject<HTMLInputElement> | null,
  ) => void;
  focusNewConversationInput: () => void;
  setNewMessageInputRef: (
    ref: React.RefObject<AutosizeTextAreaRef> | null,
  ) => void;
  focusNewMessageInput: () => void;
  clearNewMessageInput: () => void;
}

export interface ChatStoreProps {
  activeVisitors: Visitor[];
  conversations: FullConversation[];
}

export type ChatStore = ReturnType<typeof createChatStore>;

export const createChatStore = (initProps: ChatStoreProps) => {
  return createStore<ChatState>()((set, get) => ({
    ...initProps,
    activeConversation: null,
    newConversationInputRef: null,
    newMessageInputRef: null,
    setActiveVisitors: (visitors) => set({ activeVisitors: visitors }),
    setActiveConversation: (conversation) => {
      set({ activeConversation: conversation });
      // Focus the newMessageInput after setting the active conversation
      setTimeout(() => get().focusNewMessageInput(), 0);
    },
    updateActiveConversation: (updates) =>
      set((state) => ({
        activeConversation: state.activeConversation
          ? { ...state.activeConversation, ...updates }
          : null,
      })),
    addActiveVisitor: (visitor) =>
      set((state) => ({
        activeVisitors: [...state.activeVisitors, visitor],
      })),
    removeActiveVisitor: (visitorId) =>
      set((state) => ({
        activeVisitors: state.activeVisitors.filter((v) => v.id !== visitorId),
      })),

    setNewConversationInputRef: (ref) => set({ newConversationInputRef: ref }),
    focusNewConversationInput: () => {
      const { newConversationInputRef } = get();
      newConversationInputRef?.current?.focus();
    },
    setNewMessageInputRef: (ref) => set({ newMessageInputRef: ref }),
    focusNewMessageInput: () => {
      const { newMessageInputRef } = get();
      newMessageInputRef?.current?.textArea.focus();
    },
    clearNewMessageInput: () => {
      const { newMessageInputRef } = get();

      if (newMessageInputRef?.current) {
        newMessageInputRef.current.clear();
      }
    },
  }));
};
