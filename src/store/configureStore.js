import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import ReduxThunk from "redux-thunk";

import profileReducer from "./reducers/profile";
import authReducer from "./reducers/auth";
import modalReducer from "./reducers/modals";
import themeReducer from "./reducers/theme";
import languageReducer from "./reducers/language";
import spinnerReducer from "./reducers/spinner";

let composeEnhancers = null;
if (process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

export const configureStore = () => {
  const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    modal: modalReducer,
    isDarkMode: themeReducer,
    language: languageReducer,
    showSpinner: spinnerReducer
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
  );

  return store;
};
