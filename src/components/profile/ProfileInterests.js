import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardSection,
  CardHeader,
  CardHeaderText,
  FlexCardList,
  CardListItem,
  CardListItemContent,
  TextContainer
} from "../UI/Profile";
import { Image, Text } from "../UI/Layout";

const ProfileInterests = props => {
  const profile = useSelector(state => state.profile);

  let interests;
  if (profile) {
    interests = profile.interests;
  }

  const { t } = useTranslation();

  return (
    <Card marginBottom="0px">
      <CardSection
        borderBottom="1px solid rgba(0, 0, 0, 0.15)"
        padding="0 0 24px"
      >
        <CardHeader margin="0" padding="24px 24px 0">
          <CardHeaderText>{t("interests")}</CardHeaderText>
        </CardHeader>
        {interests && (
          <FlexCardList>
            {interests.map(interest => {
              return (
                <CardListItem width="50%" noBorder key={interest.id}>
                  <CardListItemContent>
                    <Image src="https://via.placeholder.com/48" />
                    <TextContainer>
                      <Text fontWeight="600" fontSize="1.6rem" lineHeight="1.5">
                        {interest.organization}
                      </Text>
                      <Text
                        fontWeight="400"
                        fontSize="1.4rem"
                        lineHeight="1.4"
                        color="rgba(0, 0, 0, 0.6)"
                      >
                        {interest.member} {t("members")}
                      </Text>
                    </TextContainer>
                  </CardListItemContent>
                </CardListItem>
              );
            })}
          </FlexCardList>
        )}
      </CardSection>
    </Card>
  );
};

export default ProfileInterests;
