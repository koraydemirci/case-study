import { EN, TR } from "../actions/actionTypes";

let initialState = "";

export default (state = initialState, action) => {
  switch (action.type) {
    case EN:
      return "en";
    case TR:
      return "tr";
    default:
      return state;
  }
};
