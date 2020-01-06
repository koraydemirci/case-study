import React, { useState, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { Text, FlexContainer, Span } from "../../UI/Layout";
import { Form, FormGroup, Label, Input, Button, TextArea } from "../../UI/Form";
import { formReducer, FORM_INPUT_UPDATE } from "../../../shared/utility";
import {
  createEducation,
  updateEducation,
  deleteEducation
} from "../../../store/actions/profileEducation";
import { showSpinner, closeSpinner } from "../../../store/actions/spinner";

const validate = value => {
  if (value && value.length > 2) {
    return true;
  }
  return false;
};
const EducationEditModal = props => {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const { id } = props;

  let education;
  if (profile && profile.education && id) {
    education = profile.education.find(e => e.id === id);
  }

  const [requiredField, setRequiredField] = useState(null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      school: education ? education.school : "",
      degree: education ? education.degree : "",
      startDate: education ? education.startDate : "",
      endDate: education ? education.endDate : "",
      description: education ? education.description : ""
    },
    inputValidities: {
      school: education ? true : false,
      degree: education ? true : false,
      startDate: education ? true : false,
      endDate: education ? true : false,
      description: education ? true : false
    },
    formIsValid: education ? true : false
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
    school,
    degree,
    startDate,
    endDate,
    description
  } = formState.inputValues;

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
        if (education && education.id) {
          await dispatch(
            updateEducation(
              school,
              degree,
              startDate,
              endDate,
              description,
              education.id
            )
          );
          dispatch(closeSpinner());
          props.onClose();
        } else {
          await dispatch(
            createEducation(school, degree, startDate, endDate, description)
          );
          dispatch(closeSpinner());
          props.onClose();
        }
        props.onClose();
      } catch (error) {
        console.error(error);
        dispatch(closeSpinner());
        props.onClose();
      }
    },
    [dispatch, formState]
  );

  const handleDelete = async () => {
    dispatch(showSpinner());
    try {
      await dispatch(deleteEducation(id));
      dispatch(closeSpinner());
      props.onClose();
    } catch (error) {
      console.error(error);
      dispatch(closeSpinner());
      props.onClose();
    }
  };

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Text margin="0 18px" fontSize="25px">
        {t("education")}
      </Text>
      <Form>
        <FlexContainer flexWrap="wrap" justifyContent="space-between">
          <FormGroup>
            <Label>{t("school")}</Label>
            <Input
              value={school}
              name="school"
              type="text"
              onChange={handleInputChange}
            />
            {requiredField === "school" && (
              <Span color="#FF0000">{t("schoolIsRequired")}</Span>
            )}
          </FormGroup>
          <FormGroup>
            <Label>{t("degree")}</Label>
            <Input
              value={degree}
              name="degree"
              type="text"
              onChange={handleInputChange}
            />
            {requiredField === "degree" && (
              <Span color="#FF0000">{t("degreeIsRequired")}</Span>
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
          </FormGroup>
          <FormGroup>
            <Label>{t("endDate")}</Label>
            <Input
              value={endDate}
              name="endDate"
              type="endDate"
              onChange={handleInputChange}
            />
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
              onClick={id ? handleDelete : props.onClose}
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

export default EducationEditModal;
