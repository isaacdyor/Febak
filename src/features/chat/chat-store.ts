"use client";

import { type AutosizeTextAreaRef } from "@/components/ui/autosize-text-area";
import { type FullConversation, type Visitor } from "@/server/db/types";
import { createStore } from "zustand";

export interface ChatState {
  activeConversation: FullConversation | null;
  newConversationVisitor: Visitor | null;
  showDetail: boolean;
  newConversationInputRef: React.RefObject<HTMLInputElement> | null;
  newMessageInputRef: React.RefObject<AutosizeTextAreaRef> | null;
  setActiveConversation: (conversation: FullConversation | null) => void;
  updateActiveConversation: (updates: Partial<FullConversation>) => void;
  setNewConversationVisitor: (visitor: Visitor | null) => void;
  setShowDetail: (showDetail: boolean) => void;
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

export type ChatStore = ReturnType<typeof createChatStore>;

export const createChatStore = () => {
  return createStore<ChatState>()((set, get) => ({
    activeConversation: null,
    showDetail: false,
    newConversationInputRef: null,
    newMessageInputRef: null,
    newConversationVisitor: null,
    setActiveConversation: (conversation) => {
      set({ activeConversation: conversation });
      setTimeout(() => get().focusNewMessageInput(), 0);
    },
    updateActiveConversation: (updates) =>
      set((state) => ({
        activeConversation: state.activeConversation
          ? { ...state.activeConversation, ...updates }
          : null,
      })),
    setNewConversationVisitor: (visitor) =>
      set({ newConversationVisitor: visitor }),
    setShowDetail: (showDetail) => set({ showDetail }),
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
