import { type FullConversation, type Visitor } from "@/server/db/types";
import { v4 as uuidv4 } from "uuid"; // Make sure to install the uuid package

export const generateConversation = (
  conversation: Partial<FullConversation>,
): FullConversation => {
  const now = new Date();
  const tempId = uuidv4();

  const visitor: Visitor = {
    id: conversation.visitorId ?? tempId,
    name: conversation.visitor?.name ?? null,
    userId: conversation.userId ?? tempId,
    active: conversation.visitor?.active ?? true,
    currentPage: conversation.visitor?.currentPage ?? null,
    lastSeen: conversation.visitor?.lastSeen ?? now,
    createdAt: conversation.visitor?.createdAt ?? now,
  };

  return {
    id: conversation.id ?? tempId,
    userId: conversation.userId ?? tempId,
    visitorId: visitor.id,
    createdAt: now,
    updatedAt: now,
    visitor: visitor,
    messages: conversation.messages ?? [],
  };
};
