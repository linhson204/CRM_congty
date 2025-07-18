import { TOGGLE_SIDEBAR, ToggleSidebarAction } from "./types";

export const toggleSidebar = (): ToggleSidebarAction => ({
  type: TOGGLE_SIDEBAR,
});

interface Action {
  type: string;
  payload?: any;
}

export const setActiveNavbar = (id: string): Action => ({
  type: "SET_ACTIVE_NAVBAR",
  payload: id,
});

export interface SetSelectedElementAction extends Action {
  type: "SET_SELECTED_ELEMENT";
  payload: number;
}

export interface ResetSelectedElementAction extends Action {
  type: "RESET_SELECTED_ELEMENT";
}

export const setSelectedElement = (
  elementId: number
): SetSelectedElementAction => {
  return {
    type: "SET_SELECTED_ELEMENT",
    payload: elementId,
  };
};

export const resetSelectedElement = (): ResetSelectedElementAction => {
  return {
    type: "RESET_SELECTED_ELEMENT",
  };
};

export type ActionTypes = SetSelectedElementAction | ResetSelectedElementAction;
