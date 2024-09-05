import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  conversations,
  insertConversation,
  messages,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const conversationsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      insertConversation.extend({
        messageContent: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        // Insert the conversation
        const [newConversation] = await tx
          .insert(conversations)
          .values({
            userId: input.userId,
            visitorId: input.visitorId,
          })
          .returning();

        if (!newConversation) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create conversation",
          });
        }

        // Insert the message
        const [newMessage] = await tx
          .insert(messages)
          .values({
            conversationId: newConversation.id,
            content: input.messageContent,
            sentByUser: true, // Assuming the first message is sent by the user
          })
          .returning();

        if (!newMessage) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create message",
          });
        }

        return {
          ...newConversation,
          messages: [newMessage],
        };
      });
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    const activeVisitors = await ctx.db.query.conversations.findMany({
      where: and(eq(conversations.userId, ctx.user.id)),
      orderBy: (visitors, { desc }) => [desc(visitors.createdAt)],
      with: {
        visitor: true,
        messages: true,
      },
    });

    return activeVisitors.length > 0 ? activeVisitors : null;
  }),
});
