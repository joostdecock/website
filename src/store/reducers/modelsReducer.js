import { SET_MODELS } from "../actions/models";

const INITIAL_STATE = false;

const models = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MODELS:
      return action.models;
    default:
      return state;
  }
};

export default models;
