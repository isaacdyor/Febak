"use client";

import React, { createContext, useState } from "react";

interface DashboardContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const DashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DashboardContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DashboardContext.Provider>
  );
};
