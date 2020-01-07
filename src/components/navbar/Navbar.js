import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { NavContainer, FlexContainer, ListItem, Span } from "../UI/Layout";
import { Button } from "../UI/Form";
import { logout } from "../../store/actions/auth";
import { changeToLightMode, changeToDarkMode } from "../../store/actions/theme";
import { changeToEnglish, changeToTurkish } from "../../store/actions/language";

const Navbar = props => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.isDarkMode);
  const language = useSelector(state => state.language);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(changeToLightMode());
    props.history.push("/login");
  };

  const toggleTheme = () => {
    if (isDarkMode) {
      dispatch(changeToLightMode());
    } else {
      dispatch(changeToDarkMode());
    }
  };

  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    if (language === "en") {
      i18n.changeLanguage("tr");
      dispatch(changeToTurkish());
    } else {
      i18n.changeLanguage("en");
      dispatch(changeToEnglish());
    }
  };

  return (
    <NavContainer>
      <FlexContainer as="ul" width="960px" maxWidth="960px" margin="0 auto">
        <ListItem fontSize="2rem" margin="0 auto 0 0" padding="10px 0">
          <Span fonstSize="2rem" color="#fff" padding="10px 0">
            LINKEDIN
          </Span>
        </ListItem>
        <ListItem fontSize="1.6rem" padding="15px 25px">
          <Button
            padding="0"
            margin="0"
            background="transparent"
            border="none"
            color="#fff"
            fontSize="1.5rem"
            onClick={toggleLanguage}
          >
            {language === "en" ? "Türkçe'ye Çevir" : "Translate to English"}
          </Button>
        </ListItem>
        <ListItem fontSize="1.6rem" padding="15px 25px">
          <Button
            padding="0"
            margin="0"
            background="transparent"
            border="none"
            color="#fff"
            fontSize="1.5rem"
            onClick={toggleTheme}
          >
            {isDarkMode ? t("lightMode") : t("darkMode")}
          </Button>
        </ListItem>
        <ListItem fontSize="1.6rem" padding="15px 0 0 25px">
          <Button
            margin="0"
            padding="0"
            fontSize="1.5rem"
            background="transparent"
            border="none"
            color="#fff"
            onClick={handleLogout}
          >
            {t("logOut")}
          </Button>
        </ListItem>
      </FlexContainer>
    </NavContainer>
  );
};

export default withRouter(Navbar);
