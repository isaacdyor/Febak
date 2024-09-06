import { type Conversation } from "@/server/db/types";

export const checkActiveConversationExists = (
  conversations: Conversation[],
  activeConversation: Conversation | null,
): boolean => {
  if (!activeConversation) return false;

  // Using Array.some() for efficient checking
  return conversations.some((conv) => conv.id === activeConversation.id);

  // Alternatively, if you prefer using find:
  // return conversations.find(conv => conv.id === activeConversation.id) !== undefined;
};
