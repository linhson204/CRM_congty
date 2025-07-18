import { TOGGLE_SIDEBAR, SidebarActionTypes } from "../actions/types";

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

const sidebarReducer = (
  state = initialState,
  action: SidebarActionTypes
): SidebarState => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
