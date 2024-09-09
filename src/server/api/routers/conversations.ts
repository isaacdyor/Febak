import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  conversations,
  insertConversation,
  messages,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const conversationsRouter = createTRPCRouter({
  create: privateProcedure
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
            userId: ctx.user.id,
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
            sentByUser: true,
          })
          .returning();

        if (!newMessage) {
          // If message creation fails, explicitly roll back the transaction
          tx.rollback();
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

  // create: privateProcedure
  //   .input(
  //     insertConversation.extend({
  //       messageContent: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     // Insert the conversation
  //     const [newConversation] = await ctx.db
  //       .insert(conversations)
  //       .values({
  //         userId: ctx.user.id,
  //         visitorId: input.visitorId,
  //       })
  //       .returning();

  //     if (!newConversation) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Failed to create conversation",
  //       });
  //     }

  //     return newConversation;
  //   }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    const allConversations = await ctx.db.query.conversations.findMany({
      where: and(eq(conversations.userId, ctx.user.id)),
      orderBy: (visitors, { desc }) => [desc(visitors.createdAt)],
      with: {
        visitor: true,
        messages: true,
      },
    });

    return allConversations.length > 0 ? allConversations : null;
  }),
});
