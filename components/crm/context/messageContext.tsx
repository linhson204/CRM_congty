import { createContext, useState } from "react";

export const MessageContext = createContext<any>(false);
export const MessageContextComponent = ({ children }) => {
    const [dataConversation, setDataConversation] = useState<any>();
    const [convSocket, setConvSocket] = useState<any>({})
    return (
        <MessageContext.Provider
            value={{ dataConversation, setDataConversation, convSocket, setConvSocket }}
        >
            {children}
        </MessageContext.Provider>
    );
};
