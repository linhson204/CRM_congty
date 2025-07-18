import { createContext, useContext, useState } from "react";

const TriggerContext = createContext<any>(false);

export function TriggerProvider({ children }) {
  const [trigger, setTrigger] = useState(true);

  return (
    <TriggerContext.Provider value={{ trigger, setTrigger }}>
      {children}
    </TriggerContext.Provider>
  );
}

export function useTrigger() {
  return useContext(TriggerContext);
}
