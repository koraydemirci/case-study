import React, { useCallback, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Text, FlexContainer1 } from "../../UI/Layout";
import { Form, FormGroup, Label, Input, Button } from "../../UI/Form";
import { formReducer, FORM_INPUT_UPDATE } from "../../../shared/utility";
import {
  createEducation,
  updateEducation,
  deleteEducation
} from "../../../store/actions/profileEducation";

const validate = value => {
  return value && value.length > 0;
};

const EducationEditModal = props => {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const { id } = props;

  let education;
  if (profile && profile.education && id) {
    education = profile.education.find(e => e.id === id);
  }

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

      if (!formState.formIsValid) {
        return;
      }
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
        } else {
          await dispatch(
            createEducation(school, degree, startDate, endDate, description)
          );
        }
        props.onClose();
      } catch (err) {
        props.onClose();
      }
    },
    [dispatch, formState]
  );

  const handleDelete = async () => {
    try {
      await dispatch(deleteEducation(id));
    } catch (error) {
      console.error(error);
    }
    props.onClose();
  };
  return (
    <React.Fragment>
      <Text margin="0 18px" fontSize="25px">
        Education
      </Text>
      <Form>
        <FlexContainer1 justifyContent="space-between">
          <FormGroup>
            <Label>School</Label>
            <Input
              value={school}
              name="school"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Degree</Label>
            <Input
              value={degree}
              name="degree"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Start Date</Label>
            <Input
              value={startDate}
              name="startDate"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>End Date</Label>
            <Input
              value={endDate}
              name="endDate"
              type="endDate"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup width="100%">
            <Label>Description</Label>
            <Input
              value={description}
              name="description"
              type="text"
              onChange={handleInputChange}
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
              {id ? "Delete" : "Cancel"}
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
              {id ? "Update" : "Save"}
            </Button>
          </FormGroup>
        </FlexContainer1>
      </Form>
    </React.Fragment>
  );
};

export default EducationEditModal;
