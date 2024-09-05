import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // The third argument has to be an empty string, so that properties without the VITE_ prefix are not ignored
  const env = loadEnv(mode, process.cwd(), "");

  // Dirty, because process.env should be read-only
  process.env = Object.assign(process.env, env);

  return {
    plugins: [react()],
    test: {
      environment: "jsdom",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
