import React from "react";
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
import { Text } from "../UI/Layout";

const ProfileAccomplishments = props => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardSection
        borderBottom="1px solid rgba(0, 0, 0, 0.15)"
        padding="0 0 24px"
      >
        <CardHeader margin="0" padding="24px 24px 0">
          <CardHeaderText>{t("accomplishments")}</CardHeaderText>
        </CardHeader>
        <CardList>
          <CardListItem>
            <CardListItemContent>
              <Text fontSize="3.2rem" padding="0 12px 0 0">
                2
              </Text>
              <div>
                <Text fontSize="1.4rem" fontWeight="600">
                  {t("publications")}
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
