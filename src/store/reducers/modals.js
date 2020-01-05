import { MODAL_OPEN, MODAL_CLOSE } from "../actions/actionTypes";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case MODAL_CLOSE:
      return null;
    default:
      return state;
  }
};
