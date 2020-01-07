import React, { useCallback, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { Text, FlexContainer, Span } from "../../UI/Layout";
import { Form, FormGroup, Label, Input, Button, TextArea } from "../../UI/Form";
import { formReducer, FORM_INPUT_UPDATE } from "../../../shared/utility";
import {
  createExperience,
  updateExperience,
  deleteExperience
} from "../../../store/actions/profileExperience";
import { showSpinner, closeSpinner } from "../../../store/actions/spinner";

const validate = value => {
  if (value && value.length > 2) {
    return true;
  }
  return false;
};

const ExperienceEditModal = ({ id, onClose }) => {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  let experience;
  if (profile && profile.experience && id) {
    experience = profile.experience.find(e => e.id === id);
  }

  const [requiredField, setRequiredField] = useState(null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: experience ? experience.title : "",
      location: experience ? experience.location : "",
      company: experience ? experience.company : "",
      startDate: experience ? experience.startDate : "",
      endDate: experience ? experience.endDate : "",
      description: experience ? experience.description : ""
    },
    inputValidities: {
      title: experience ? true : false,
      company: experience ? true : false,
      startDate: experience ? true : false,
      endDate: experience ? true : false
    },
    formIsValid: experience ? true : false
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
    title,
    company,
    startDate,
    endDate,
    description,
    location
  } = formState.inputValues;

  const handleSubmit = event => {
    event.preventDefault();
    for (let key in formState.inputValidities) {
      if (!formState.inputValidities[key]) {
        setRequiredField(key);
        return;
      }
    }
    dispatch(showSpinner());

    try {
      if (experience && experience.id) {
        dispatch(
          updateExperience(
            title,
            company,
            startDate,
            endDate,
            description,
            location,
            experience.id
          )
        );
        dispatch(closeSpinner());
        onClose();
      } else {
        dispatch(
          createExperience(
            title,
            company,
            startDate,
            endDate,
            description,
            location
          )
        );
      }
      dispatch(closeSpinner());
      onClose();
    } catch (error) {
      console.error(error);
      dispatch(closeSpinner());
      onClose();
    }
  };

  const handleDelete = () => {
    dispatch(showSpinner());
    try {
      dispatch(deleteExperience(id));
      dispatch(closeSpinner());
      onClose();
    } catch (error) {
      console.error(error);
      dispatch(closeSpinner());
      onClose();
    }
  };

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Text margin="0 18px" fontSize="25px">
        {t("experience")}
      </Text>
      <Form>
        <FlexContainer flexWrap="wrap" justifyContent="space-between">
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
            <Label>{t("location")}</Label>
            <Input
              value={location}
              name="location"
              type="text"
              onChange={handleInputChange}
            />
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
          <FormGroup>
            <Label>{t("startDate")}</Label>
            <Input
              value={startDate}
              name="startDate"
              type="text"
              onChange={handleInputChange}
            />
            {requiredField === "startDate" && (
              <Span color="#FF0000">{t("startDateIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup>
            <Label>{t("endDate")}</Label>
            <Input
              value={endDate}
              name="endDate"
              type="endDate"
              onChange={handleInputChange}
            />
            {requiredField === "endDate" && (
              <Span color="#FF0000">{t("endDateIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup width="100%">
            <Label>{t("description")}</Label>
            <TextArea
              name="description"
              onChange={handleInputChange}
              value={description}
            />
          </FormGroup>
          <FormGroup width="30%">
            <Button
              fontSize="1.6rem"
              background="#e74c3c"
              width="100%"
              type="button"
              onClick={id ? handleDelete : onClose}
            >
              {id ? t("delete") : t("cancel")}
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
              {id ? t("update") : t("save")}
            </Button>
          </FormGroup>
        </FlexContainer>
      </Form>
    </React.Fragment>
  );
};

export default ExperienceEditModal;
