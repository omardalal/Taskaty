import { ACTION_TYPES } from "../Actions";
/* eslint-disable indent */
const auth = (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return action.user;
    default:
      return state;
  }
};

export default auth;
