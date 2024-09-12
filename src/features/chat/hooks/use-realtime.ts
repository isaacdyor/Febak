import { createClient } from "@/lib/supabase/client";
import { api } from "@/trpc/react";
import { useCallback, useEffect } from "react";

const supabase = createClient();

export function useRealtime() {
  const utils = api.useUtils();

  const handleInsert = useCallback(() => {
    console.log("New message inserted");
    void utils.conversations.getAll.invalidate();
  }, [utils.conversations.getAll]);

  useEffect(() => {
    const channel = supabase.channel("realtime");

    const channelA = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) => handleInsert(),
      )
      .subscribe();

    return () => {
      console.log("Cleaning up subscription");
      void supabase.removeChannel(channel);
    };
  }, [handleInsert]);
}
