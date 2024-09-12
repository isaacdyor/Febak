import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { VisitorProvider } from "@/providers/visitor-provider";
import { ThemeProvider } from "@/providers/theme-provider";

// export const metadata: Metadata = {
//   title: "Febak",
//   description: "Sick chat app",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

export const metadata: Metadata = {
  title: "Febak",
  description: "Sick chat app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} dark`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <VisitorProvider />

            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
