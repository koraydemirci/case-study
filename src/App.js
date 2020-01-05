import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ModalManager from "./components/modals/ModalManager";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { authenticate } from "./store/actions/auth";
import "./App.css";

const App = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      return;
    }
    const transformedData = JSON.parse(userData);
    const { token, userId, expiryDate } = transformedData;
    const expirationDate = new Date(expiryDate);

    if (expirationDate <= new Date() || !token || !userId) {
      return;
    }

    const expirationTime = expirationDate.getTime() - new Date().getTime();
    dispatch(authenticate(userId, token, expirationTime));
  }, [dispatch]);

  const isAuthenticated = useSelector(state => state.auth.token);

  let routes = (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Redirect to="/login" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/profile" component={ProfilePage} />
        <Redirect to="/profile" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <ModalManager />
      {routes}
    </BrowserRouter>
  );
};

export default App;
