import { type FullConversation, type Visitor } from "@/server/db/types";
import { v4 as uuidv4 } from "uuid"; // Make sure to install the uuid package

// export const generateConversation = (
//   visitor: Visitor,
//   userId: string,
// ): FullConversation => {
//   const now = new Date();

//   return {
//     id: uuidv4(),
//     userId: userId,
//     visitorId: visitor.id,
//     createdAt: now,
//     updatedAt: now,
//     visitor: visitor,
//     messages: [],
//   };
// };
export const generateConversation = (
  visitor: Visitor,
  userId: string,
): FullConversation => {
  const now = new Date();

  return {
    id: uuidv4(),
    userId: userId,
    visitorId: visitor.id,
    createdAt: now,
    updatedAt: now,
    visitor: visitor,
    messages: [],
  };
};
