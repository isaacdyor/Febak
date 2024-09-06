"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const createVisitor = api.visitors.create.useMutation();
  return (
    <div>
      <p>hi</p>
      <Button
        onClick={async () =>
          await createVisitor.mutateAsync({
            id: uuidv4(),
            userId: uuidv4(),
          })
        }
      >
        Hello
      </Button>
    </div>
  );
}
