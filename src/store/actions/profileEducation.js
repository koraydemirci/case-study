import {
  CREATE_EDUCATION,
  UPDATE_EDUCATION,
  DELETE_EDUCATION
} from "./actionTypes";

export const createEducation = (
  school,
  degree,
  startDate,
  endDate,
  description
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/education.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          school,
          degree,
          startDate,
          endDate,
          description
        })
      }
    );
    const resData = await response.json();
    if (resData) {
      dispatch({
        type: CREATE_EDUCATION,
        education: {
          school,
          degree,
          startDate,
          endDate,
          description,
          id: Object.values(resData)[0]
        }
      });
    }
  };
};

export const updateEducation = (
  school,
  degree,
  startDate,
  endDate,
  description,
  id
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/education/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          school,
          degree,
          startDate,
          endDate,
          description
        })
      }
    );
    const resData = await response.json();

    if (resData) {
      dispatch({
        type: UPDATE_EDUCATION,
        education: {
          school,
          degree,
          startDate,
          endDate,
          description,
          id
        }
      });
    }
  };
};

export const deleteEducation = id => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/education/${id}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_EDUCATION, education: { id } });
  };
};
