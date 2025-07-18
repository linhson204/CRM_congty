"use client";
import { createContext, useState } from "react";

export const CallContext = createContext(false);

export const TongDaiContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <CallContext.Provider value={{ isConnected, setIsConnected } as any}>
      {children}
    </CallContext.Provider>
  );
};
