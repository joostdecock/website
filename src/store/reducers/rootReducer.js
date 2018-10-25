import { combineReducers } from "redux";
import darkMode from "./darkModeReducer";
import user from "./userReducer";
import token from "./tokenReducer";
import notification from "./notificationReducer";

const rootReducer = combineReducers({
  darkMode,
  user,
  token,
  notification
});

export default rootReducer;
