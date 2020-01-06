import { EN, TR } from "../actions/actionTypes";

let initialState = "en";
const language = localStorage.getItem("language");
if (language) {
  initialState = language;
}

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
