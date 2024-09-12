"use client";

import { VisitorChat } from "@/features/visitor-chat/components";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export function VisitorProvider() {
  const createVisitor = api.visitors.create.useMutation();
  const endSession = api.visitors.endSession.useMutation();
  const startSession = api.visitors.startSession.useMutation();

  // useEffect(() => {
  //   const checkAndSetVisitorId = async () => {
  //     let visitorId = localStorage.getItem("visitorId");
  //     let active = localStorage.getItem("active");

  //     if (!visitorId) {
  //       visitorId = uuidv4();
  //       localStorage.setItem("visitorId", visitorId);

  //       try {
  //         await createVisitor.mutateAsync({
  //           id: visitorId,
  //           userId: "eff994ee-475f-4d02-9f10-73378011410d", // Consider generating this dynamically or using a more appropriate ID
  //         });
  //         console.log("Added visitor to database:", visitorId);
  //       } catch (error) {
  //         console.error("Failed to add visitor to database:", error);
  //       }
  //     } else if (active !== "true") {
  //       try {
  //         active = "true";
  //         localStorage.setItem("active", active);
  //         await startSession.mutateAsync({ id: visitorId });
  //         console.log("Started session for visitor:", visitorId);
  //       } catch (error) {
  //         console.error("Failed to start session:", error);
  //       }
  //     }
  //   };

  //   void checkAndSetVisitorId();

  //   window.addEventListener("beforeunload", () => {
  //     const visitorId = localStorage.getItem("visitorId");
  //     localStorage.setItem("active", "false");
  //     if (visitorId) {
  //       navigator.sendBeacon(`/api/end-session/${visitorId}`);
  //     }
  //   });
  // }, [createVisitor, endSession, startSession]);

  // return null;
  return <VisitorChat />;
}
