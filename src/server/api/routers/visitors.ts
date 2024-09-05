import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { insertVisitor, visitors } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const visitorsRouter = createTRPCRouter({
  create: publicProcedure
    .input(insertVisitor)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(visitors).values({
        id: input.id,
        userId: input.userId,
      });
    }),
  doSomething: publicProcedure.mutation(async () => {
    return "Hello World";
  }),

  getActive: privateProcedure.query(async ({ ctx }) => {
    const activeVisitors = await ctx.db.query.visitors.findMany({
      where: and(eq(visitors.userId, ctx.user.id), eq(visitors.active, true)),
      orderBy: (visitors, { desc }) => [desc(visitors.createdAt)],
    });

    return activeVisitors.length > 0 ? activeVisitors : null;
  }),

  endSession: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatedVisitor = await ctx.db
        .update(visitors)
        .set({
          active: false,
          lastSeen: new Date(),
        })
        .where(eq(visitors.id, input.id))
        .returning();

      return updatedVisitor;
    }),

  startSession: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatedVisitor = await ctx.db
        .update(visitors)
        .set({
          active: true,
          lastSeen: new Date(),
        })
        .where(eq(visitors.id, input.id))
        .returning();

      return updatedVisitor;
    }),
});
