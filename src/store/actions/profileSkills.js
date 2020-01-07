import { CREATE_SKILL, DELETE_SKILL } from "./actionTypes";

export const createSkill = skill => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/skills.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          skill
        })
      }
    );
    const resData = await response.json();
    if (resData) {
      dispatch({
        type: CREATE_SKILL,
        skill: {
          skill,
          id: Object.values(resData)[0]
        }
      });
    }
  };
};

export const deleteSkill = id => {
  console.log("TCL: id", id);
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://oplog-case-study.firebaseio.com/profile/skills/${id}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_SKILL, skill: { id } });
  };
};
