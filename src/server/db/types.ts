import { type z } from "zod";
import {
  type selectMessage,
  type selectConversation,
  type selectVisitor,
} from "@/server/db/schema";

export type Visitor = z.infer<typeof selectVisitor>;
export type Message = z.infer<typeof selectMessage>;
export type Conversation = z.infer<typeof selectConversation>;

export type FullConversation = Conversation & {
  visitor: Visitor;
  messages: Message[];
};
