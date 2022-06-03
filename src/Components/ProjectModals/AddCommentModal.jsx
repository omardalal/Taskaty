import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextArea, TextInput } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";

const AddCommentModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  loggedUser
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
      //
      setSuccessMessage(true);
      setAlertMessage("Project Graded!");
      setTimeout(() => {
        onSuccess?.();
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
          buttonText={strings.create}
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
  loggedUser: PropTypes.object
};

export default AddCommentModal;
