import React, { useState, useCallback, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { Text, FlexContainer, Span } from "../../UI/Layout";
import { Form, FormGroup, Label, Input, Button } from "../../UI/Form";
import { formReducer, FORM_INPUT_UPDATE } from "../../../shared/utility";
import { createSkill } from "../../../store/actions/profileSkills";
import { showSpinner, closeSpinner } from "../../../store/actions/spinner";

const validate = value => {
  if (value && value.length > 2) {
    return true;
  }
  return false;
};
const SkillsAddModal = props => {
  const dispatch = useDispatch();

  const [requiredField, setRequiredField] = useState(null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      skill: ""
    },
    inputValidities: {
      skill: false
    },
    formIsValid: false
  });

  const handleInputChange = useCallback(
    event => {
      setRequiredField(null);
      const value = event.target.value;
      const input = event.target.name;
      let isValid = validate(value);

      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value,
        isValid,
        input
      });
    },
    [dispatchFormState]
  );

  const { skill } = formState.inputValues;

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      for (let key in formState.inputValidities) {
        if (!formState.inputValidities[key]) {
          setRequiredField(key);
          return;
        }
      }
      dispatch(showSpinner());

      try {
        await dispatch(createSkill(skill));
        dispatch(closeSpinner());
        props.onClose();
      } catch (error) {
        console.error(error);
        dispatch(closeSpinner());
        props.onClose();
      }
    },
    [dispatch, formState]
  );

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Text margin="0 18px" fontSize="25px">
        {t("skills")}
      </Text>
      <Form>
        <FlexContainer flexWrap="wrap" justifyContent="space-between">
          <FormGroup width="100%">
            <Label>{t("skill")}</Label>
            <Input
              value={skill}
              name="skill"
              type="text"
              onChange={handleInputChange}
            />
            {requiredField === "skill" && (
              <Span color="#FF0000">{t("skillIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup width="30%">
            <Button
              fontSize="1.6rem"
              background="#e74c3c"
              width="100%"
              type="button"
              onClick={props.onClose}
            >
              {t("cancel")}
            </Button>
          </FormGroup>
          <FormGroup width="30%">
            <Button
              fontSize="1.6rem"
              background="#0e7cd1"
              width="100%"
              type="submit"
              onClick={handleSubmit}
            >
              {t("save")}
            </Button>
          </FormGroup>
        </FlexContainer>
      </Form>
    </React.Fragment>
  );
};

export default SkillsAddModal;
