import React, { useState, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { Text, FlexContainer, Icon } from "../../UI/Layout";
import { Form, FormGroup, Label, Input, Button } from "../../UI/Form";

import { IconButton } from "../../UI/Form";
import { deleteSkill } from "../../../store/actions/profileSkills";
import { showSpinner, closeSpinner } from "../../../store/actions/spinner";

const SkillsDeleteModal = props => {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.profile);

  let skills;
  if (profile) {
    skills = profile.skills;
  }

  const handleDelete = async id => {
    dispatch(showSpinner());
    try {
      await dispatch(deleteSkill(id));
      dispatch(closeSpinner());
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
        {t("skills")}
      </Text>
      {skills &&
        skills.map(skill => (
          <FlexContainer
            key={skill.id}
            flexWrap="wrap"
            justifyContent="space-between"
            margin="0 0 5px 0"
          >
            <Text fontSize="1.7rem" margin="0 0 0 20px" fontWeight="400">
              - {skill.skill}
            </Text>
            <IconButton
              margin="0 40px 0 auto"
              onClick={() => handleDelete(skill.id)}
            >
              <Icon color="#990000" className="fas fa-trash fa-2x"></Icon>
            </IconButton>
          </FlexContainer>
        ))}
      <FlexContainer justifyContent="flex-end">
        <FormGroup width="30%">
          <Button
            margin="10px 0 0 0"
            fontSize="1.6rem"
            background="#e74c3c"
            width="100%"
            type="button"
            onClick={props.onClose}
          >
            {t("cancel")}
          </Button>
        </FormGroup>
      </FlexContainer>
    </React.Fragment>
  );
};

export default SkillsDeleteModal;
