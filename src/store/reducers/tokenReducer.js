import { SET_TOKEN } from "../actions/token";

const INITIAL_STATE = false;

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.token;
    default:
      return state;
  }
};

export default token;
