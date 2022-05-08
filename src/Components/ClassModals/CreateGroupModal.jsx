import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextInput } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";

const CreateGroupModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess
}) => {
  const formInitialState = {
    groupName: ""
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
    if (!formData.groupName) {
      setShowError(true);
      return;
    }
    onSuccess(formData.groupName);
  };

  const getForm = () => (
    <>
      <TextInput
        invalid={showError && !formData.groupName}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Group Name"}
        placeholder={"Group Name"}
        onChange={(evt) => {
          setFormData({ ...formData, groupName: evt.target?.value });
        }}
        light
      />
    </>
  );

  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={"Create new group"}
          descriptionText={"Enter group information"}
          buttonText={strings.create}
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

CreateGroupModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func
};

export default CreateGroupModal;
