interface State {
  activeNavbarId: string | null;
}

interface Action {
  type: string;
  payload?: any;
}
// let activeLinkId: string | null;
// activeLinkId = "";
// if (typeof window !== "undefined" && window.localStorage) {
// }
// console.log(typeof activeLinkId);
// const activeLinkId = localStorage.getItem("activeNavbarId");

const initialState: State = {
  activeNavbarId: "",
};

const activeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_ACTIVE_NAVBAR":
      return {
        ...state,
        activeNavbarId: action.payload,
      };
    default:
      return state;
  }
};

export default activeReducer;
