import { FETCH_PROFILE } from "./actionTypes";

export const fetchProfile = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://oplog-case-study.firebaseio.com/profile.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      //populate intro
      let intro = resData.intro;
      const id = Object.keys(intro);
      intro = { ...intro[id], id: id[0] };

      //populate education
      let education = [];
      for (let key in resData.education) {
        education.push({
          school: resData.education[key].school,
          degree: resData.education[key].degree,
          startDate: resData.education[key].startDate,
          endDate: resData.education[key].endDate,
          desription: resData.education[key].description,
          id: key
        });
      }

      //populate experience
      let experience = [];
      for (let key in resData.experience) {
        experience.push({
          title: resData.experience[key].title,
          company: resData.experience[key].company,
          startDate: resData.experience[key].startDate,
          endDate: resData.experience[key].endDate,
          desription: resData.experience[key].description,
          location: resData.experience[key].location,
          id: key
        });
      }

      //populate interest
      let interests = [];
      for (let key in resData.interests) {
        interests.push({
          organization: resData.interests[key].organization,
          member: resData.interests[key].member,
          id: key
        });
      }

      //populate skills
      let skills = [];
      for (let key in resData.skills) {
        skills.push({
          skill: resData.skills[key].skill,
          id: key
        });
      }

      if (resData) {
        dispatch({
          type: FETCH_PROFILE,
          profile: { intro, education, experience, interests, skills }
        });
      }
    } catch (err) {
      throw err;
    }
  };
};
