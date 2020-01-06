import { LIGHT_MODE, DARK_MODE } from "../actions/actionTypes";

export const changeToLightMode = () => {
  localStorage.setItem(
    "theme",
    JSON.stringify({
      isDarkMode: false
    })
  );
  return {
    type: LIGHT_MODE
  };
};

export const changeToDarkMode = () => {
  localStorage.setItem(
    "theme",
    JSON.stringify({
      isDarkMode: true
    })
  );
  return {
    type: DARK_MODE
  };
};
