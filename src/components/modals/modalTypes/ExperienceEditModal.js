import React, { useCallback, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Text, FlexContainer1 } from "../../UI/Layout";
import { Form, FormGroup, Label, Input, Button } from "../../UI/Form";
import { formReducer, FORM_INPUT_UPDATE } from "../../../shared/utility";
import {
  createExperience,
  updateExperience,
  deleteExperience
} from "../../../store/actions/profileExperience";

const validate = value => {
  return value && value.length > 0;
};

const ExperienceEditModal = props => {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const { id } = props;

  let experience;
  if (profile && profile.experience && id) {
    experience = profile.experience.find(e => e.id === id);
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: experience ? experience.title : "",
      company: experience ? experience.company : "",
      startDate: experience ? experience.startDate : "",
      endDate: experience ? experience.endDate : "",
      description: experience ? experience.description : ""
    },
    inputValidities: {
      title: experience ? true : false,
      company: experience ? true : false,
      startDate: experience ? true : false,
      endDate: experience ? true : false,
      description: experience ? true : false
    },
    formIsValid: experience ? true : false
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
    title,
    company,
    startDate,
    endDate,
    description,
    location
  } = formState.inputValues;

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      if (!formState.formIsValid) {
        return;
      }
      try {
        if (experience && experience.id) {
          await dispatch(
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
        } else {
          await dispatch(
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
        props.onClose();
      } catch (err) {
        props.onClose();
      }
    },
    [dispatch, formState]
  );

  const handleDelete = async () => {
    try {
      await dispatch(deleteExperience(id));
    } catch (error) {
      console.error(error);
    }
    props.onClose();
  };
  return (
    <React.Fragment>
      <Text margin="0 18px" fontSize="25px">
        Experience
      </Text>
      <Form>
        <FlexContainer1 justifyContent="space-between">
          <FormGroup>
            <Label>Title</Label>
            <Input
              value={title}
              name="title"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Location</Label>
            <Input
              value={location}
              name="ocation"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup width="100%">
            <Label>Company</Label>
            <Input
              value={company}
              name="company"
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

export default ExperienceEditModal;
