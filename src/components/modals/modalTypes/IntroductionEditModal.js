import React, { useCallback, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Text, FlexContainer1 } from "../../UI/Layout";
import { Form, FormGroup, Label, Input, Button } from "../../UI/Form";
import { formReducer, FORM_INPUT_UPDATE } from "../../../shared/utility";
import { createIntro, updateIntro } from "../../../store/actions/profileIntro";

const validate = value => {
  return value && value.length > 0;
};

const IntroductionEditModal = props => {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();
  let intro;
  if (profile) {
    intro = profile.intro;
  }

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

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      if (!formState.formIsValid) {
        return;
      }
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
        } else {
          await dispatch(
            createIntro(name, surname, location, company, title, education)
          );
        }
        props.onClose();
      } catch (err) {
        props.onClose();
      }
    },
    [dispatch, formState]
  );

  return (
    <React.Fragment>
      <Text margin="0 18px" fontSize="25px">
        Intro
      </Text>
      <Form>
        <FlexContainer1 justifyContent="space-between">
          <FormGroup>
            <Label>Name</Label>
            <Input
              value={name}
              name="name"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Surname</Label>
            <Input
              value={surname}
              name="surname"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
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
              name="location"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup width="100%">
            <Label>Education</Label>
            <Input
              value={education}
              name="education"
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

          <FormGroup width="30%">
            <Button
              fontSize="1.6rem"
              background="#e74c3c"
              width="100%"
              type="submit"
              onClick={props.onClose}
            >
              Cancel
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
              Save
            </Button>
          </FormGroup>
        </FlexContainer1>
      </Form>
    </React.Fragment>
  );
};

export default IntroductionEditModal;
