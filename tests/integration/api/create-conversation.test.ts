import { createCaller } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import { type RouterInputs } from "@/trpc/react";
import { v4 as uuidv4 } from "uuid";
import { expect, it } from "vitest";

it("should be able to create conversation", async () => {
  const ctx = createInnerTRPCContext({ user: null });
  const caller = createCaller(ctx);

  const input: RouterInputs["conversations"]["create"] = {
    visitorId: "2a05b26c-8034-4b88-8894-455b1be4033a",
    userId: uuidv4(),
    messageContent: "Hello, this is a test message",
  };

  const mockResult = {
    conversation: {
      id: uuidv4(),
      userId: input.userId,
      visitorId: input.visitorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    message: {
      id: uuidv4(),
      conversationId: uuidv4(), // This should match the conversation.id in a real scenario
      content: input.messageContent,
      sentByUser: true,
      createdAt: new Date(),
    },
  };

  // const mockCreate = vi.fn().mockResolvedValue(mockResult);
  // vi.spyOn(caller.conversations, "create").mockImplementation(mockCreate);

  const result = await caller.conversations.create(input);

  // Assertions
  // expect(mockCreate).toHaveBeenCalledWith(input);
  expect(result).toBeDefined();

  // Check conversation
  expect(result.conversation).toBeDefined();
  expect(result.conversation.id).toBeDefined();
  expect(result.conversation.visitorId).toBe(input.visitorId);
  expect(result.conversation.userId).toBe(input.userId);
  expect(result.conversation.createdAt).toBeInstanceOf(Date);
  expect(result.conversation.updatedAt).toBeInstanceOf(Date);

  // Check message
  expect(result.message).toBeDefined();
  expect(result.message.id).toBeDefined();
  expect(result.message.conversationId).toBeDefined();
  expect(result.message.content).toBe(input.messageContent);
  expect(result.message.sentByUser).toBe(true);
  expect(result.message.createdAt).toBeInstanceOf(Date);

  // Ensure the message's conversationId matches the conversation's id
  expect(result.message.conversationId).toBe(result.conversation.id);
});
