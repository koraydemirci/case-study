import React, { useCallback, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { Text, FlexContainer, Span } from "../../UI/Layout";
import { Form, FormGroup, Label, Input, Button } from "../../UI/Form";
import { formReducer, FORM_INPUT_UPDATE } from "../../../shared/utility";
import { createIntro, updateIntro } from "../../../store/actions/profileIntro";
import { showSpinner, closeSpinner } from "../../../store/actions/spinner";

const validate = value => {
  if (value && value.length > 2) {
    return true;
  }
  return false;
};

const IntroductionEditModal = props => {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();
  let intro;
  if (profile) {
    intro = profile.intro;
  }

  const [requiredField, setRequiredField] = useState(null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: intro ? intro.name : "",
      surname: intro ? intro.surname : "",
      company: intro ? intro.company : "",
      education: intro ? intro.education : "",
      location: intro ? intro.location : "",
      title: intro ? intro.title : ""
    },
    inputValidities: {
      name: intro ? true : false,
      surname: intro ? true : false,
      company: intro ? true : false,
      education: intro ? true : false,
      location: intro ? true : false,
      title: intro ? true : false
    },
    formIsValid: intro ? true : false
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

  const {
    name,
    surname,
    location,
    company,
    title,
    education
  } = formState.inputValues;

  const handleSubmit = async event => {
    event.preventDefault();
    for (let key in formState.inputValidities) {
      if (!formState.inputValidities[key]) {
        setRequiredField(key);
        return;
      }
    }
    dispatch(showSpinner());
    try {
      if (intro.id) {
        await dispatch(
          updateIntro(
            name,
            surname,
            location,
            company,
            title,
            education,
            intro.id
          )
        );
        dispatch(closeSpinner());
        props.onClose();
      } else {
        await dispatch(
          createIntro(name, surname, location, company, title, education)
        );
        dispatch(closeSpinner());
        props.onClose();
      }
    } catch (error) {
      console.error(error);
      props.onClose();
      dispatch(closeSpinner());
    }
  };

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Text margin="0 18px" fontSize="25px">
        {t("intro")}
      </Text>
      <Form margin="0">
        <FlexContainer flexWrap="wrap" justifyContent="space-between">
          <FormGroup>
            <Label>{t("name")}</Label>
            <Input
              value={name}
              name="name"
              type="text"
              onChange={handleInputChange}
            />
            {requiredField === "name" && (
              <Span color="#FF0000">{t("nameIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup>
            <Label>{t("surname")}</Label>
            <Input
              value={surname}
              name="surname"
              type="text"
              onChange={handleInputChange}
            />{" "}
            {requiredField === "surname" && (
              <Span color="#FF0000">{t("surnameIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup>
            <Label>{t("title")}</Label>
            <Input
              value={title}
              name="title"
              type="text"
              onChange={handleInputChange}
            />
            {requiredField === "title" && (
              <Span color="#FF0000">{t("titleIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup>
            <Label>{t("")}</Label>
            <Input
              value={location}
              name="location"
              type="text"
              onChange={handleInputChange}
            />
            {requiredField === "location" && (
              <Span color="#FF0000">{t("locationIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup width="100%">
            <Label>{t("school")}</Label>
            <Input
              value={education}
              name="education"
              type="text"
              onChange={handleInputChange}
            />
            {requiredField === "education" && (
              <Span color="#FF0000">{t("schoolIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup width="100%">
            <Label>{t("company")}</Label>
            <Input
              value={company}
              name="company"
              type="text"
              onChange={handleInputChange}
            />
            {requiredField === "company" && (
              <Span color="#FF0000">{t("companyIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup width="30%">
            <Button
              fontSize="1.6rem"
              background="#e74c3c"
              width="100%"
              type="submit"
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
              {t("update")}
            </Button>
          </FormGroup>
        </FlexContainer>
      </Form>
    </React.Fragment>
  );
};

export default IntroductionEditModal;
