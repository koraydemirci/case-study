import {
  CREATE_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE
} from "./actionTypes";

export const createExperience = (
  title,
  company,
  startDate,
  endDate,
  description,
  location
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/experience.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          company,
          startDate,
          endDate,
          description,
          location
        })
      }
    );
    const resData = await response.json();
    if (resData) {
      dispatch({
        type: CREATE_EXPERIENCE,
        experience: {
          title,
          company,
          startDate,
          endDate,
          description,
          location,
          id: Object.keys(resData)[0]
        }
      });
    }
  };
};

export const updateExperience = (
  title,
  company,
  startDate,
  endDate,
  description,
  location,
  id
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/experience/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          company,
          startDate,
          endDate,
          description,
          location,
          id
        })
      }
    );
    const resData = await response.json();

    if (resData) {
      dispatch({
        type: UPDATE_EXPERIENCE,
        experience: {
          title,
          company,
          startDate,
          endDate,
          description,
          location,
          id
        }
      });
    }
  };
};

export const deleteExperience = id => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/experience/${id}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_EXPERIENCE, experience: { id } });
  };
};
