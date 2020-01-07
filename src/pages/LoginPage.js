import React, { useState, useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { FlexContainer, Span } from "../components/UI/Layout";
import { Form, FormGroup, Label, Input, Button } from "../components/UI/Form";
import { login } from "../store/actions/auth";
import { showSpinner, closeSpinner } from "../store/actions/spinner";
import { formReducer, FORM_INPUT_UPDATE } from "../shared/utility";

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = password => {
  if (password && password.length > 5) {
    return true;
  }
  return false;
};

const LoginPage = props => {
  const dispatch = useDispatch();

  const [requiredField, setRequiredField] = useState(null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const handleInputChange = event => {
    setRequiredField(null);
    const value = event.target.value;
    const input = event.target.name;
    let isValid = false;
    if (input === "email") {
      isValid = validateEmail(value);
    } else if (input === "password") {
      isValid = validatePassword(value);
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value,
      isValid,
      input
    });
  };

  const handleLogin = async event => {
    event.preventDefault();
    for (let key in formState.inputValidities) {
      if (!formState.inputValidities[key]) {
        setRequiredField(key);
        return;
      }
    }
    const authAction = login(
      formState.inputValues.email,
      formState.inputValues.password
    );
    dispatch(showSpinner());
    try {
      await dispatch(authAction);
      props.history.push("/profile");
      dispatch(closeSpinner());
    } catch (err) {
      dispatch(closeSpinner());
    }
  };

  const { t } = useTranslation();

  return (
    <FlexContainer
      height="100vh"
      justifyContent="center"
      background="linear-gradient(
      90deg,
      rgba(93, 119, 144, 1) 0%,
      rgba(8, 138, 238, 1) 100%,
      rgba(0, 212, 255, 1) 100%
    )"
    >
      <Form width="350px" border="1px solid #ddd">
        <FormGroup width="100%">
          <Label>{t("email")}</Label>
          <Input
            name="email"
            type="text"
            placeholder="email@example.com"
            onChange={handleInputChange}
          />
          {requiredField === "email" && (
            <Span color="#FF0000">{t("emailIsRequired")}</Span>
          )}
        </FormGroup>
        <FormGroup width="100%">
          <Label>{t("password")}</Label>
          <Input
            name="password"
            type="password"
            placeholder="*******"
            onChange={handleInputChange}
          />
          {requiredField === "password" && (
            <Span color="#FF0000">{t("passwordIsRequired")}</Span>
          )}
        </FormGroup>
        <FormGroup width="100%">
          <Button
            padding="10px"
            fontSize="2rem"
            background="#0e7cd1"
            width="100%"
            type="submit"
            onClick={handleLogin}
          >
            {t("login")}
          </Button>
        </FormGroup>
      </Form>
    </FlexContainer>
  );
};

export default LoginPage;
