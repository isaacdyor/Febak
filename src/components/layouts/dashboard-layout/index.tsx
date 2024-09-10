"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Topbar />
        {children}
      </div>
    </div>
  );
};
