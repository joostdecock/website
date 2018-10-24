import { SHOW_NOTIFICATION, CLOSE_NOTIFICATION } from "../actions/notification";

const INITIAL_STATE = {
  show: false,
  style: "info",
  message: ""
};

const notification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        show: true,
        style: action.style,
        message: action.message
      };
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
};

export default notification;
