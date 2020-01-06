import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal, Backdrop } from "../UI/Layout";
import {
  IntroductionEditModal,
  ExperienceEditModal,
  EducationEditModal,
  SkillsAddModal,
  AccomplishmentsEditModal,
  SkillsDeleteModal
} from "./modalTypes";
import { closeModal } from "../../store/actions/modal";

const modalLookup = {
  IntroductionEditModal,
  ExperienceEditModal,
  EducationEditModal,
  SkillsAddModal,
  AccomplishmentsEditModal,
  SkillsDeleteModal
};

const ModalManager = props => {
  const dispatch = useDispatch();
  const currentModal = useSelector(state => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    return (
      <React.Fragment>
        <Backdrop onClick={handleClose} />
        <Modal>
          <ModalComponent onClose={handleClose} {...modalProps} />
        </Modal>
      </React.Fragment>
    );
  }

  return null;
};

export default ModalManager;
