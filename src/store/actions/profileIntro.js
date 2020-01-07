import { CREATE_INTRO, UPDATE_INTRO } from "./actionTypes";

export const createIntro = (
  name,
  surname,
  location,
  company,
  title,
  education
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/intro.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          surname,
          location,
          company,
          title,
          education
        })
      }
    );
    const resData = await response.json();
    if (resData) {
      dispatch({
        type: CREATE_INTRO,
        intro: {
          name,
          surname,
          location,
          company,
          title,
          education,
          id: Object.values(resData)[0]
        }
      });
    }
  };
};

export const updateIntro = (
  name,
  surname,
  location,
  company,
  title,
  education,
  id
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/intro/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          surname,
          location,
          company,
          title,
          education
        })
      }
    );
    const resData = await response.json();

    if (resData) {
      dispatch({
        type: UPDATE_INTRO,
        intro: {
          name,
          surname,
          location,
          company,
          title,
          education,
          id
        }
      });
    }
  };
};
