import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";

import ModalManager from "./components/modals/ModalManager";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/navbar/Navbar";
import Spinner from "./components/UI/Spinner";
import { AppThemeContainer } from "./components/UI/Layout";
import { authenticate } from "./store/actions/auth";
import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";

import "./App.css";

const App = props => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.isDarkMode);
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      return;
    }
    const transformedData = JSON.parse(userData);
    const { token, userId } = transformedData;

    dispatch(authenticate(userId, token));
  }, [dispatch]);

  const isAuthenticated = useSelector(state => state.auth.token);
  const showSpinner = useSelector(state => state.showSpinner);

  let routes = null;

  if (!isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  if (isAuthenticated) {
    routes = (
      <React.Fragment>
        <ModalManager />
        <Navbar />
        <Switch>
          <Route path="/profile" component={ProfilePage} />
          <Redirect to="/profile" />
        </Switch>
      </React.Fragment>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <AppThemeContainer>
          {showSpinner && <Spinner />}
          {routes}
        </AppThemeContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
