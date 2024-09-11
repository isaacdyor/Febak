"use client";

import { MainNav } from "./main-nav";
import { TopbarDesktop } from "./topbar-desktop";
import { TopbarMobile } from "./topbar-mobile";
import { DashboardProvider } from "./dashboard-context"; // Import the provider

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DashboardProvider>
      <div className="flex">
        <MainNav />
        <div className="flex h-screen w-full flex-col">
          <TopbarDesktop />
          <TopbarMobile />
          {children}
        </div>
      </div>
    </DashboardProvider>
  );
};
