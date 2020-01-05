import { MODAL_CLOSE, MODAL_OPEN } from "./actionTypes";

export const openModal = (modalType, modalProps) => {
  return {
    type: MODAL_OPEN,
    modalType,
    modalProps
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE
  };
};
