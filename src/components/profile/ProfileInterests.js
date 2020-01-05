import React from "react";

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
  const obj = [
    { name: "Bilkent University", member: 1908 },
    { name: "Bilkent University", member: 1908 },
    { name: "Bilkent University", member: 1908 },
    { name: "Bilkent University", member: 1908 },
    { name: "Bilkent University", member: 1908 },
    { name: "Bilkent University", member: 1908 }
  ];
  return (
    <Card>
      <CardSection
        borderBottom="1px solid rgba(0, 0, 0, 0.15)"
        padding="0 0 24px"
      >
        <CardHeader margin="0" padding="24px 24px 0">
          <CardHeaderText>Interests</CardHeaderText>
        </CardHeader>
        <FlexCardList>
          {obj.map(o => {
            return (
              <CardListItem width="50%" noBorder>
                <CardListItemContent>
                  <Image src="https://via.placeholder.com/48" />
                  <TextContainer>
                    <Text fontWeight="600" fontSize="1.6rem" lineHeight="1.5">
                      {o.name}
                    </Text>
                    <Text
                      fontWeight="400"
                      fontSize="1.4rem"
                      lineHeight="1.4"
                      color="rgba(0, 0, 0, 0.6)"
                    >
                      {o.member} members
                    </Text>
                  </TextContainer>
                </CardListItemContent>
              </CardListItem>
            );
          })}
        </FlexCardList>
      </CardSection>
    </Card>
  );
};

export default ProfileInterests;
