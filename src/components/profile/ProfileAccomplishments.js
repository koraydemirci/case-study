import React from "react";

import {
  Card,
  CardSection,
  CardHeader,
  CardHeaderText,
  CardList,
  CardListItem,
  CardListItemContent
} from "../UI/Profile";
import { Link, Icon, Text } from "../UI/Layout";
import { IconButton } from "../UI/Form";

const ProfileAccomplishments = props => {
  return (
    <Card>
      <CardSection
        borderBottom="1px solid rgba(0, 0, 0, 0.15)"
        padding="0 0 24px"
      >
        <CardHeader margin="0" padding="24px 24px 0">
          <CardHeaderText>Accomplishments</CardHeaderText>
          {/* <IconButton>
            <Icon className="fas fa-plus fa-2x" color="#0073b1"></Icon>
          </IconButton> */}
        </CardHeader>
        <CardList>
          <CardListItem>
            <CardListItemContent>
              <Text fontSize="3.2rem" padding="0 12px 0 0" color="#0073b1">
                2
              </Text>
              <div>
                <Text fontSize="1.4rem" fontWeight="600" color="#0073b1">
                  Publications
                </Text>
                <Text
                  fontWeight="400"
                  fontSize="1.4rem"
                  lineHeight="1.4"
                  color="rgba(0, 0, 0, 0.9)"
                  margin="15 0 0 0"
                >
                  In this study, we address the problem of matching patterns in
                  Kufic calligraphy images. Being used as a decorative element,
                  Kufic images have been designed in a way that makes it
                </Text>
              </div>
            </CardListItemContent>
          </CardListItem>
        </CardList>
      </CardSection>
    </Card>
  );
};

export default ProfileAccomplishments;
