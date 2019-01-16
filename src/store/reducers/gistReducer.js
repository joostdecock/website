import { SET_GIST } from "../actions/gist";

const INITIAL_STATE = false;

const gist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GIST:
      return action.gist;
    default:
      return state;
  }
};

export default gist;
