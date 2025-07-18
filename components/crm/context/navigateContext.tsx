"use client";
import { createContext, useContext, useState } from "react";
const defaultValue = "Trang chủ";

export const NavigateContext = createContext(defaultValue);

export const NavigateContextComponent: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState(defaultValue);
  const [showBackButton, setShowBackButton] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  return (
    <NavigateContext.Provider
      value={
        {
          headerTitle,
          setHeaderTitle,
          showBackButton,
          setShowBackButton,
          currentPath,
          setCurrentPath,
        } as any
      }
    >
      {children}
    </NavigateContext.Provider>
  );
};
