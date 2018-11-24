import { combineReducers } from "redux";
import darkMode from "./darkModeReducer";
import user from "./userReducer";
import models from "./modelsReducer";
import notification from "./notificationReducer";

const rootReducer = combineReducers({
  darkMode,
  user,
  models,
  notification
});

export default rootReducer;
