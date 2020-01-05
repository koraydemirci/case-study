import React, { useState, useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";

import { FlexContainer } from "../components/UI/Layout";
import { Form, FormGroup, Label, Input, Button } from "../components/UI/Form";
import { login } from "../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = password => {
  return password && password.length > 5;
};

const LoginPage = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

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

  const handleInputChange = useCallback(
    event => {
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
    },
    [dispatchFormState]
  );

  const handleLogin = async event => {
    event.preventDefault();
    const authAction = login(
      formState.inputValues.email,
      formState.inputValues.password
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authAction);
      props.history.push("/profile");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
  }

  if (error) {
  }

  return (
    <FlexContainer>
      <Form width="350px" border="1px solid #ddd">
        <FormGroup width="100%">
          <Label>Email</Label>
          <Input
            name="email"
            type="text"
            placeholder="email@example.com"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup width="100%">
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="*******"
            onChange={handleInputChange}
          />
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
            Login
          </Button>
        </FormGroup>
      </Form>
    </FlexContainer>
  );
};

export default LoginPage;
