import { createContext, useState } from "react";

export const useDataContainer = createContext<any>(false);
export const DataContainerProvider = ({ children }) => {
  const [dataContainer, setDataContainer] = useState<any>({});
  return (
    <useDataContainer.Provider value={{ dataContainer, setDataContainer }}>
      {children}
    </useDataContainer.Provider>
  );
};
