import { combineReducers } from "redux";
import darkMode from "./darkModeReducer";
import user from "./userReducer";
import notification from "./notificationReducer";

const rootReducer = combineReducers({
  darkMode,
  user,
  notification
});

export default rootReducer;
