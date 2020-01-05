import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProfile } from "../store/actions/profile";
import { Container } from "../components/UI/Layout";
import ProfileIntroduction from "../components/profile/ProfileIntroduction";
import ProfileExperience from "../components/profile/ProfileExperience";
import ProfileSkills from "../components/profile/ProfileSkills";
import ProfileAccomplishments from "../components/profile/ProfileAccomplishments";
import ProfileInterests from "../components/profile/ProfileInterests";

const ProfilePage = props => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  const loadProfile = useCallback(async () => {
    try {
      await dispatch(fetchProfile());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadProfile();
  }, [dispatch, loadProfile]);

  if (profile.intro) {
    return (
      <Container>
        <ProfileIntroduction />
        <ProfileExperience />
        <ProfileSkills />
        <ProfileAccomplishments />
        <ProfileInterests />
      </Container>
    );
  }

  return null;
};

export default ProfilePage;
