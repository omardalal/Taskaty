import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextArea } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";
import { addSubmissionComment } from "../../Utilities/TaskUtils";
import { Timestamp } from "firebase/firestore";

const AddCommentModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  loggedUser,
  submissionId
}) => {
  const formInitialState = {
    body: ""
  };

  const [formData, setFormData] = useState(formInitialState);
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    setFormData(formInitialState);
    setShowError(false);
    setAlertMessage("");
    setSuccessMessage(false);
  }, [visible]);

  useAOS();

  const handleSubmitPress = async () => {
    if (!formData.body) {
      setShowError(true);
      return;
    }
    try {
      await addSubmissionComment(
        loggedUser?.user?.email,
        submissionId,
        formData.body
      );
      setSuccessMessage(true);
      setAlertMessage("Comment Added!");
      setTimeout(() => {
        onSuccess?.({
          body: formData.body,
          date: Timestamp.now(),
          user: loggedUser?.user?.email
        });
      }, 600);
    } catch (error) {
      setAlertMessage("Something went wrong!");
    }
  };

  const getForm = () => (
    <>
      <TextArea
        data-modal-primary-focus
        labelText={"Comment Body"}
        placeholder={"Comment Body"}
        onChange={(evt) => {
          setFormData({ ...formData, body: evt.target?.value });
        }}
        light
      />
    </>
  );

  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={"Add Comment"}
          descriptionText={"Enter your comment!"}
          buttonText={"Add"}
          buttonOnClick={handleSubmitPress}
          FormElement={getForm()}
          minHeight={300}
          hasDismissButton
          onDismissPress={onDismissPress}
          showAlert={alertMessage}
          alertSuccess={successMessage}
          alertMessage={alertMessage}
        />
      </div>
    </Modal>
  );
};

AddCommentModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func,
  loggedUser: PropTypes.object,
  submissionId: PropTypes.string
};

export default AddCommentModal;
