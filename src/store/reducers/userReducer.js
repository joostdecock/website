import { SET_USER_ACCOUNT } from "../actions/user";

const INITIAL_STATE = null;

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_ACCOUNT:
      return action.account;
    default:
      return state;
  }
};

export default user;
