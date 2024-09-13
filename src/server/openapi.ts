import { generateOpenApiDocument } from "trpc-openapi";
import { appRouter } from "./api/root";

/* 👇 */
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Febak API",
  version: "1.0.0",
  baseUrl: "http://localhost:3000",
});
