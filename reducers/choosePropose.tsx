import { ActionTypes } from "@/actions/actions";

interface State {
  selectedElementId: number | null;
}

const initialState: State = {
  selectedElementId: 0,
};

const reducerPropose = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case "SET_SELECTED_ELEMENT":
      return {
        ...state,
        selectedElementId: action.payload,
      };
    case "RESET_SELECTED_ELEMENT":
      return {
        ...state,
        selectedElementId: 0,
      };
    default:
      return state;
  }
};

export default reducerPropose;
