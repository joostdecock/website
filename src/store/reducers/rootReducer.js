import { combineReducers } from "redux";
import darkMode from "./darkModeReducer";
import user from "./userReducer";
import models from "./modelsReducer";
import drafts from "./draftsReducer";
import notification from "./notificationReducer";

const rootReducer = combineReducers({
  darkMode,
  user,
  models,
  drafts,
  notification
});

export default rootReducer;
