import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { type NextRequest, type NextResponse } from "next/server";

import { createOpenApiNextHandler } from "trpc-openapi";

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = async (req: NextRequest, res: NextResponse) => {
  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    router: appRouter,
    createContext: () => createContext(req),
    responseMeta: null,
    onError: null,
  })(req, res);
};

export default handler;
