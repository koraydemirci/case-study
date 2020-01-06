import { EN, TR } from "../actions/actionTypes";

export const changeToEnglish = () => {
  localStorage.setItem("language", "en");
  return {
    type: EN
  };
};

export const changeToTurkish = () => {
  localStorage.setItem("language", "tr");
  return {
    type: TR
  };
};
