import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextInput } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";

const JoinClassModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess
}) => {
  const formInitialState = {
    invitationUrl: ""
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
    if (!formData.invitationUrl) {
      setShowError(true);
    }
  };

  const getForm = () => (
    <>
      <TextInput
        invalid={showError && !formData.invitationUrl}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={strings.invitationLink}
        placeholder={strings.invitationLink}
        onChange={(evt) => {
          setFormData({ ...formData, invitationUrl: evt.target?.value });
        }}
        light
      />
    </>
  );

  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={strings.invitationLink}
          descriptionText={strings.enterInvitationLink}
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
  onSuccess: PropTypes.func
};

export default JoinClassModal;
