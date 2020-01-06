import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./i18n";
import "./index.css";
import App from "./App";

import { configureStore } from "./store/configureStore";

const store = configureStore();

ReactDOM.render(
  <Suspense fallback="">
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById("root")
);
