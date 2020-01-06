import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  CardSection,
  CardHeader,
  CardHeaderText,
  CardList,
  CardListItem,
  CardListItemContent,
  TextContainer
} from "../UI/Profile";
import { Image, Icon, Text } from "../UI/Layout";
import { IconButton } from "../UI/Form";
import { openModal } from "../../store/actions/modal";

const ProfileEducation = props => {
  const dispatch = useDispatch();
  const handleEdit = id => {
    dispatch(openModal("EducationEditModal", { id }));
  };
  const profile = useSelector(state => state.profile);

  let educationHistory;
  if (profile) {
    educationHistory = profile.education;
  }

  const { t } = useTranslation();

  return (
    <CardSection padding="0">
      <CardHeader margin="0" padding="24px 24px 0">
        <CardHeaderText>{t("education")}</CardHeaderText>
        <IconButton onClick={() => handleEdit()}>
          <Icon className="fas fa-plus fa-2x"></Icon>
        </IconButton>
      </CardHeader>
      {educationHistory && (
        <CardList>
          {educationHistory.map(education => {
            return (
              <CardListItem key={education.id}>
                <CardListItemContent>
                  <Image src="https://via.placeholder.com/48" />
                  <TextContainer>
                    <Text fontWeight="600" fontSize="1.6rem" lineHeight="1.5">
                      {education.school}
                    </Text>
                    <Text
                      fontWeight="400"
                      fontSize="1.4rem"
                      lineHeight="1.4"
                      color="rgba(0, 0, 0, 0.9)"
                    >
                      {education.degree}
                    </Text>
                    <Text
                      fontWeight="400"
                      fontSize="1.4rem"
                      lineHeight="1.4"
                      color="rgba(0, 0, 0, 0.6)"
                    >
                      {education.startDate} - {education.endDate}
                    </Text>
                    <Text
                      fontWeight="400"
                      fontSize="1.4rem"
                      lineHeight="1.4"
                      color="rgba(0, 0, 0, 0.9)"
                      margin="15 0 0 0"
                    >
                      {education.description}
                    </Text>
                  </TextContainer>
                </CardListItemContent>
                <IconButton onClick={() => handleEdit(education.id)}>
                  <Icon className="fas fa-pen fa-2x"></Icon>
                </IconButton>
              </CardListItem>
            );
          })}
        </CardList>
      )}
    </CardSection>
  );

  return null;
};

export default ProfileEducation;
