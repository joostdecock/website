import { combineReducers } from "redux";
import darkMode from "./darkModeReducer";

const rootReducer = combineReducers({
  darkMode
});

export default rootReducer;
