import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardSection,
  CardHeader,
  CardHeaderText,
  CardList,
  CardListItem,
  CardListItemContent
} from "../UI/Profile";
import { Image, Icon, Text } from "../UI/Layout";
import { IconButton, Button } from "../UI/Form";
import { openModal } from "../../store/actions/modal";

const ProfileSkills = props => {
  const dispatch = useDispatch();

  const handleAddSkill = () => {
    dispatch(openModal("SkillsAddModal"));
  };

  const handleDeleteSkill = () => {
    dispatch(openModal("SkillsDeleteModal"));
  };

  const profile = useSelector(state => state.profile);

  let skills;
  if (profile) {
    skills = profile.skills;
  }

  const { t } = useTranslation();

  return (
    <Card>
      <CardSection padding="0">
        <CardHeader margin="0" padding="24px 24px 0">
          <CardHeaderText>{t("skills")}</CardHeaderText>
          <Button border="none" onClick={handleAddSkill}>
            <Text
              fontWeight="600"
              fontSize="1.6rem"
              margin="0 18px"
              color="rgba(0, 0, 0, 0.6)"
            >
              {t("addNewSkill")}
            </Text>
          </Button>
          <IconButton onClick={handleDeleteSkill}>
            <Icon className="fas fa-pen fa-2x"></Icon>
          </IconButton>
        </CardHeader>
        {skills && (
          <CardList>
            {skills.map(skill => {
              return (
                <CardListItem column key={skill.id}>
                  <Text
                    fontWeight="600"
                    fontSize="1.6rem"
                    lineHeight="1.5"
                    margin="0 0 15px 0"
                  >
                    {skill.skill}
                  </Text>
                  <CardListItemContent>
                    <Image
                      borderRadius="50%"
                      margin="0 15px 0 0"
                      src="https://i.pravatar.cc/32?u=asdfds"
                    />
                    <Text
                      fontWeight="400"
                      fontSize="1.4rem"
                      lineHeight="1.4"
                      color="rgba(0, 0, 0, 0.6)"
                    >
                      {t("skillsDetail")}
                    </Text>
                  </CardListItemContent>
                </CardListItem>
              );
            })}
          </CardList>
        )}
      </CardSection>
    </Card>
  );
};

export default ProfileSkills;
