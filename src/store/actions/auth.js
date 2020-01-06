import { AUTHENTICATE, LOGOUT } from "./actionTypes";

export const authenticate = (userId, token) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgFyMhDq46xt_EIzmRQSc4lgmgljW1Mg4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken));
    saveDataToStorage(resData.idToken, resData.localId);
  };
};

const saveDataToStorage = (token, userId) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId
    })
  );
};

export const logout = () => {
  localStorage.removeItem("userData");
  return { type: LOGOUT };
};
