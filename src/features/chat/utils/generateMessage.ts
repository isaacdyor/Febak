import { v4 as uuidv4 } from "uuid";
import { type Message } from "@/server/db/types";

export const generateMessage = (input: Partial<Message>): Message => {
  const now = new Date();

  if (!input.conversationId) {
    throw new Error("conversationId is required to create a message");
  }

  if (input.content === undefined) {
    throw new Error("content is required to create a message");
  }

  return {
    id: input.id ?? uuidv4(),
    conversationId: input.conversationId,
    content: input.content,
    sentByUser: input.sentByUser ?? true,
    createdAt: input.createdAt ?? now,
  };
};
