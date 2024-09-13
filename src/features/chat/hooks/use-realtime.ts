import { useUser } from "@/features/auth/use-user";
import { createClient } from "@/lib/supabase/client";
import { api } from "@/trpc/react";
import { useEffect } from "react";

const supabase = createClient();

export function useRealtime() {
  const utils = api.useUtils();
  const { user } = useUser();

  useEffect(() => {
    const handleInsert = () => {
      void utils.conversations.getAll.invalidate();
    };

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        () => handleInsert(),
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "conversations",
          filter: `user_id=eq.${user.id}`,
        },
        () => handleInsert(),
      )
      .subscribe();

    return () => {
      console.log("Cleaning up subscription");
      void supabase.removeChannel(channel);
    };
  }, [user.id, utils.conversations.getAll]);
}
