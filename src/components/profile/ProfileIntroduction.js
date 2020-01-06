import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardHeader,
  BackgroundImageContainer,
  BackgroundImage,
  Intro,
  ProfileImageContainer
} from "../UI/Profile";
import {
  List,
  ListItem,
  Span,
  Link,
  Icon,
  ListItemContainer,
  Image
} from "../UI/Layout";
import { IconButton } from "../UI/Form";
import { openModal } from "../../store/actions/modal";

const ProfileIntroduction = props => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  let intro;
  if (profile) {
    intro = profile.intro;
  }

  const handleEdit = () => {
    dispatch(openModal("IntroductionEditModal"));
  };

  const { t } = useTranslation();

  return (
    <Card>
      <BackgroundImageContainer>
        <BackgroundImage src="https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_960_720.jpg" />
      </BackgroundImageContainer>
      <CardHeader margin="0" padding="0 24px">
        <IconButton onClick={handleEdit}>
          <Icon className="fas fa-pen fa-2x"></Icon>
        </IconButton>
      </CardHeader>
      <Intro>
        <List>
          <ListItem
            fontSize="2.4rem"
            lineHeight="1.33"
            color="rgba(0, 0, 0, 0.9)"
          >
            {intro.name} {intro.surname}
          </ListItem>
          <ListItem marginTop="4px 0 0 0" fontSize="1.8rem" lineHeight="1.33">
            {intro.title} - {intro.company}
          </ListItem>
          <ListItem margin="4px 0 0 0" fontSize="1.6rem" lineHeight="1.5">
            <Span>{intro.location}</Span> &#183;{" "}
            <Span>
              <Link href="!#">412 {t("connections")}</Link>
            </Span>{" "}
            &#183;{" "}
            <Span>
              <Link href="!#">{t("contact")}</Link>
            </Span>
          </ListItem>
        </List>
        <List width="232px" maxWidth="232px">
          <ListItemContainer>
            <Image
              src="https://via.placeholder.com/24"
              width="24px"
              height="24px"
            ></Image>
            <Link href="!#" marginLeft="10px" color="rgba(0, 0, 0, 0.9)">
              {intro.company}
            </Link>
          </ListItemContainer>
          <ListItemContainer>
            <Image
              src="https://via.placeholder.com/24"
              width="24px"
              height="24px"
            ></Image>
            <Link href="!#" marginLeft="10px" color="rgba(0, 0, 0, 0.9)">
              {intro.education}
            </Link>
          </ListItemContainer>
        </List>
      </Intro>
      <ProfileImageContainer>
        <Image
          width="100%"
          height="100%"
          src="https://i.pravatar.cc/150?u=asdfds"
        />
      </ProfileImageContainer>
    </Card>
  );
};

export default ProfileIntroduction;
