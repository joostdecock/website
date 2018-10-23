import { combineReducers } from "redux";
import darkMode from "./darkModeReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  darkMode,
  user
});

export default rootReducer;
