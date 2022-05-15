import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextInput } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";
import { addToClass } from "../../Utilities/ClassUtils";

const JoinClassModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  loggedUser
}) => {
  const formInitialState = {
    joinCode: ""
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
    if (!formData.joinCode) {
      setShowError(true);
      return;
    }

    const input = atob(formData.joinCode).split("-");
    try {
      await addToClass(input[0], input[1], loggedUser?.user?.email);
      setSuccessMessage(true);
      setAlertMessage("Joined Section!");
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
    } catch (error) {
      setAlertMessage(
        "Something went wrong! Please make sure the code is valid!"
      );
    }
  };

  const getForm = () => (
    <>
      <TextInput
        invalid={showError && !formData.joinCode}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={strings.joinCode}
        placeholder={strings.joinCode}
        onChange={(evt) => {
          setFormData({ ...formData, joinCode: evt.target?.value });
        }}
        light
      />
    </>
  );

  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={strings.joinClass}
          descriptionText={strings.enterJoinCode}
          buttonText={strings.join}
          buttonOnClick={handleSubmitPress}
          FormElement={getForm()}
          minHeight={225}
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

JoinClassModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func,
  loggedUser: PropTypes.object
};

export default JoinClassModal;
