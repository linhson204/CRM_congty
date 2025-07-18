// GlobalContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface GlobalContextState {
  set_input_value: { value: string };
  check_role: { role: string };
  // Thêm các state khác
}

interface GlobalContextValue {
  state: GlobalContextState;
  dispatch: React.Dispatch<any>;
}

const defaultValue: GlobalContextValue = {
  state: {
    set_input_value: { value: "" },
    check_role: { role: "" },
    // Khởi tạo giá trị cho các state khác
  },
  dispatch: () => {},
};

const GlobalContext = createContext(defaultValue);

interface ActionTypes {
  SET_INPUT_VALUE: string;
  SET_ROLE_USER: string
  // Thêm các type action khác
}

const actionTypes: ActionTypes = {
  SET_INPUT_VALUE: "SET_INPUT_VALUE",
  SET_ROLE_USER: "SET_ROLE_USER"
  // Thêm các action khác
};

// Tự generate reducers từ actionTypes
const generateReducers = (actionTypes: ActionTypes) => {
  return Object.keys(actionTypes).reduce((reducers: any, type) => {
    reducers[type] = (state: GlobalContextState, action: any) => ({
      ...state,
      [type.toLowerCase()]: {
        ...state[type.toLowerCase()],
        value: action.payload,
      },
    });
    return reducers;
  }, {});
};

// Tự generate actions từ actionTypes
const generateActions = (actionTypes: ActionTypes) => {
  return Object.keys(actionTypes).reduce((actions: any, type) => {
    actions[type.toLowerCase()] = (payload: any) => ({
      type: actionTypes[type],
      payload,
    });
    return actions;
  }, {});
};

// Tự generate initial state từ actionTypes
const generateInitialState = (actionTypes: ActionTypes) => {
  return Object.keys(actionTypes).reduce((state: any, type) => {
    state[type.toLowerCase()] = { value: "" };
    return state;
  }, {});
};

const reducers = generateReducers(actionTypes);
const actions = generateActions(actionTypes);
const initialState = generateInitialState(actionTypes);

const rootReducer = (state: GlobalContextState, action: any) => {
  const actionType = action.type;
  if (reducers[actionType]) {
    return reducers[actionType](state, action);
  }
  return state;
};

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const useGlobalContext = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return {
    state,
    dispatch,
  };
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const globalContextValue = useGlobalContext();

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContextValue = () => useContext(GlobalContext);

// Export các actions để có thể sử dụng trong components
export const {
  setInputValue,
  // Thêm các actions khác
} = actions;
