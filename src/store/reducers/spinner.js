import { SHOW_SPINNER, CLOSE_SPINNER } from "../actions/actionTypes";

let initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SPINNER:
      return true;
    case CLOSE_SPINNER:
      return false;
    default:
      return state;
  }
};
