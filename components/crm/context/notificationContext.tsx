import { ChangeEvent, createContext, useState } from "react";

export const useNotificationReload = createContext<any>(false);

export const NotificationContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reloadNotification, setReloadNotification] = useState<boolean>(true);

  const hanldeReload = () => {
    setReloadNotification(!reloadNotification);
  };

  return (
    <useNotificationReload.Provider
      value={
        {
          reloadNotification,
          hanldeReload,
        } as any
      }
    >
      {children}
    </useNotificationReload.Provider>
  );
};
