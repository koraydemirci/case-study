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
import { Link, Image, Icon, Text } from "../UI/Layout";
import { IconButton } from "../UI/Form";

const ProfileSkills = props => {
  const obj = [
    {
      title: "Java",
      detail: "skillsDetail"
    },
    {
      title: "C++",
      detail: "skillsDetail"
    }
  ];
  const { t } = useTranslation();

  return (
    <Card>
      <CardSection padding="0">
        <CardHeader margin="0" padding="24px 24px 0">
          <CardHeaderText></CardHeaderText>
          {/* <Link href="#!">
            <Text
              fontWeight="600"
              color="rgba(0, 0, 0, 0.6)"
              fontSize="1.6rem"
              margin="0 18px"
            >
              Add a new skill
            </Text>
          </Link>
          <IconButton>
            <Icon className="fas fa-pen fa-2x" ></Icon>
          </IconButton> */}
        </CardHeader>
        <CardList>
          {obj.map(o => {
            return (
              <CardListItem column key={o.title}>
                <Text
                  fontWeight="600"
                  fontSize="1.6rem"
                  lineHeight="1.5"
                  margin="0 0 15px 0"
                >
                  {o.title}
                </Text>
                <CardListItemContent>
                  <Image
                    borderRadius="50%"
                    margin="0 15px 0 0"
                    src="https://via.placeholder.com/32"
                  />
                  <Text
                    fontWeight="400"
                    fontSize="1.4rem"
                    lineHeight="1.4"
                    color="rgba(0, 0, 0, 0.6)"
                  >
                    {t(o.detail)}
                  </Text>
                </CardListItemContent>
              </CardListItem>
            );
          })}
        </CardList>
      </CardSection>
    </Card>
  );
};

export default ProfileSkills;
