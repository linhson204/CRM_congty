"use client";
import { createContext, useState } from "react";
const defaultValue = false;

export const UpdateTLKD = createContext(defaultValue);

export const UpdateTLKDComponent: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [updateTLKD, setUpdateTLKD] = useState<Boolean>(defaultValue)

  return (
    <UpdateTLKD.Provider
      value={{ updateTLKD, setUpdateTLKD } as any}
    >
      {children}
    </UpdateTLKD.Provider>
  );
};
