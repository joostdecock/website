import { SET_DRAFTS } from "../actions/drafts";

const INITIAL_STATE = false;

const drafts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DRAFTS:
      return action.drafts || null;
    default:
      return state;
  }
};

export default drafts;
