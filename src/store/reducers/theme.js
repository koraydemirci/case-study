import { LIGHT_MODE, DARK_MODE } from "../actions/actionTypes";

let initialState = false;
const theme = localStorage.getItem("theme");
if (theme && JSON.parse(theme).isDarkMode) {
  initialState = true;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LIGHT_MODE:
      return false;
    case DARK_MODE:
      return true;
    default:
      return state;
  }
};
