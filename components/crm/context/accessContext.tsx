"use client";
import { createContext, useState } from "react";
const defaultValue = "default value";

export const AccessContext = createContext(defaultValue);

export const AccessContextComponent: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [accessAcountRole, setAccessAcountRole] = useState({
    username: "Tran Quang Duc Dung",
    role: "company",
  });

  return (
    <AccessContext.Provider
      value={{ accessAcountRole, setAccessAcountRole } as any}
    >
      {children}
    </AccessContext.Provider>
  );
};
