import { db } from "@/server/db";
import { visitors } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const id = params.id;

    await db
      .update(visitors)
      .set({
        active: false,
        lastSeen: new Date(),
      })
      .where(eq(visitors.id, id))
      .returning();

    return new Response("success", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in end-session API route:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  }
}
