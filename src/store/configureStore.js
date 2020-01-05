import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import ReduxThunk from "redux-thunk";

import profileReducer from "./reducers/profile";
import authReducer from "./reducers/auth";
import modalReducer from "./reducers/modals";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

export const configureStore = () => {
  const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    modal: modalReducer
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
  );

  return store;
};
