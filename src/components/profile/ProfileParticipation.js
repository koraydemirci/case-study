import React from "react";
import { useDispatch, useSelector } from "react-redux";

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

const ProfileParticipation = props => {
  const dispatch = useDispatch();
  const handleEdit = id => {
    dispatch(openModal("ExperienceEditModal", { id }));
  };
  const profile = useSelector(state => state.profile);

  let experienceHistory;
  if (profile) {
    experienceHistory = profile.experience;
  }

  return (
    <CardSection
      borderBottom="1px solid rgba(0, 0, 0, 0.15)"
      padding="0 0 24px"
    >
      <CardHeader margin="0" padding="24px 24px 0">
        <CardHeaderText>Experience</CardHeaderText>
        <IconButton onClick={() => handleEdit()}>
          <Icon className="fas fa-plus fa-2x" color="#0073b1"></Icon>
        </IconButton>
      </CardHeader>
      {experienceHistory && (
        <CardList>
          {experienceHistory.map(experience => {
            return (
              <CardListItem>
                <CardListItemContent>
                  <Image src="https://via.placeholder.com/48" />
                  <TextContainer>
                    <Text fontWeight="600" fontSize="1.6rem" lineHeight="1.5">
                      {experience.title}
                    </Text>
                    <Text
                      fontWeight="400"
                      fontSize="1.4rem"
                      lineHeight="1.4"
                      color="rgba(0, 0, 0, 0.6)"
                    >
                      {experience.company}
                    </Text>
                    <Text
                      fontWeight="400"
                      fontSize="1.4rem"
                      lineHeight="1.4"
                      color="rgba(0, 0, 0, 0.6)"
                    >
                      {experience.startDate} - {experience.endDate}
                    </Text>
                    <Text
                      fontWeight="400"
                      fontSize="1.4rem"
                      lineHeight="1.4"
                      color="rgba(0, 0, 0, 0.6)"
                    >
                      {experience.location}
                    </Text>
                    <Text
                      fontWeight="400"
                      fontSize="1.4rem"
                      lineHeight="1.4"
                      color="rgba(0, 0, 0, 0.9)"
                      margin="15 0 0 0"
                    >
                      {experience.description}
                    </Text>
                  </TextContainer>
                </CardListItemContent>
                <IconButton onClick={() => handleEdit(experience.id)}>
                  <Icon className="fas fa-pen fa-2x" color="#0073b1"></Icon>
                </IconButton>
              </CardListItem>
            );
          })}
        </CardList>
      )}
    </CardSection>
  );
};

export default ProfileParticipation;
