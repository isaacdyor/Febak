import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { VisitorProvider } from "@/providers/visitor-provider";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Febak",
  description: "Sick chat app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <TRPCReactProvider>
          {/* <VisitorProvider /> */}

          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
