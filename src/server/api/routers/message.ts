import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { insertMessage, messages } from "@/server/db/schema";

export const messagesRouter = createTRPCRouter({
  create: publicProcedure
    .input(insertMessage)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messages).values({
        conversationId: input.conversationId,
        content: input.content,
        sentByUser: input.sentByUser,
      });
    }),
});
