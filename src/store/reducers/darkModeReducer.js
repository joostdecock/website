import { SET_DARK_MODE } from "../actions/darkMode";

const INITIAL_STATE = false;

const darkMode = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return action.dark;
    default:
      return state;
  }
};

export default darkMode;
