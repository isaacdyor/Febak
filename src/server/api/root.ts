import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { visitorsRouter } from "./routers/visitors";
import { conversationsRouter } from "./routers/conversations";
import { messagesRouter } from "./routers/message";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  visitors: visitorsRouter,
  conversations: conversationsRouter,
  messages: messagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
