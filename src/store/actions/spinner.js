import { SHOW_SPINNER, CLOSE_SPINNER } from "./actionTypes";

export const showSpinner = () => {
  return {
    type: SHOW_SPINNER
  };
};

export const closeSpinner = () => {
  return {
    type: CLOSE_SPINNER
  };
};
