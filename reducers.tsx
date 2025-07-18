import { combineReducers } from "redux";
import sidebarReducer from "./reducers/sidebarReducer";
import activeReducer from "./reducers/activeLinkReducer";
import reducerPropose from "./reducers/choosePropose";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  navbar: activeReducer,
  propose: reducerPropose,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootAction = SidebarActionTypes;

export default rootReducer;
