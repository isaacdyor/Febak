"use client";
import { api } from "@/trpc/react";
import { v4 as uuidv4 } from "uuid"; // Make sure to install the uuid package

export default function TrialPage() {
  const createVisitor = api.visitors.create.useMutation({
    onSuccess: async () => {
      console.log("success");
    },
  });

  return (
    <div className="flex gap-8 p-20">
      <button
        onClick={async () =>
          await createVisitor.mutateAsync({ id: uuidv4(), userId: uuidv4() })
        }
      >
        create visitor
      </button>
    </div>
  );
}
