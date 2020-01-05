import React from "react";

import ProfileParticipation from "./ProfileParticipation";
import ProfileEducation from "./ProfileEducation";
import { Card } from "../UI/Profile";

const ProfilePage = props => {
  return (
    <Card>
      <ProfileParticipation />
      <ProfileEducation />
    </Card>
  );
};

export default ProfilePage;
