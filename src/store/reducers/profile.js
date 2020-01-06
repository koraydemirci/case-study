import {
  FETCH_PROFILE,
  CREATE_INTRO,
  UPDATE_INTRO,
  CREATE_EDUCATION,
  UPDATE_EDUCATION,
  DELETE_EDUCATION,
  CREATE_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  CREATE_SKILL,
  DELETE_SKILL
} from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return action.profile;
    case CREATE_INTRO:
    case UPDATE_INTRO:
      return { ...state, intro: action.intro };
    case CREATE_EDUCATION:
      return { ...state, education: [action.education, ...state.education] };
    case UPDATE_EDUCATION:
      let updatedEducation = state.education.map(e => {
        if (e.id === action.education.id) {
          return action.education;
        }
        return e;
      });
      return { ...state, education: updatedEducation };
    case DELETE_EDUCATION:
      let deletedEducation = state.education.filter(
        e => e.id !== action.education.id
      );
      return { ...state, education: deletedEducation };
    case CREATE_EXPERIENCE:
      return { ...state, experience: [action.experience, ...state.experience] };
    case UPDATE_EXPERIENCE:
      let updatedExperience = state.experience.map(e => {
        if (e.id === action.experience.id) {
          return action.experience;
        }
        return e;
      });
      return { ...state, experience: updatedExperience };
    case DELETE_EXPERIENCE:
      let deletedExperience = state.experience.filter(
        e => e.id !== action.experience.id
      );
      return { ...state, experience: deletedExperience };
    case CREATE_SKILL:
      return { ...state, skills: [action.skill, ...state.skills] };
    case DELETE_SKILL:
      let deletedSkill = state.skills.filter(s => s.id !== action.skill.id);
      return { ...state, skills: deletedSkill };
    default:
      return state;
  }
};
