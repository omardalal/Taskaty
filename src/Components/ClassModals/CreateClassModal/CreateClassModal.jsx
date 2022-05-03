import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextInput } from "carbon-components-react";
import strings from "../../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../../InputForm/InputForm";
import Modal from "../../Modal/Modal";
import { useAOS } from "../../../CustomHooks/useAOS";

const CreateClassModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess
}) => {
  const formInitialState = {
    courseName: "",
    courseCode: "",
    courseDescription: ""
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
    if (
      !formData.courseCode ||
      !formData.courseName ||
      !formData.courseDescription
    ) {
      setShowError(true);
    }
  };

  const getForm = () => (
    <>
      <TextInput
        invalid={showError && !formData.courseName}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={strings.courseName}
        placeholder={strings.courseName}
        onChange={(evt) => {
          setFormData({ ...formData, courseName: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <TextInput
        invalid={showError && !formData.courseCode}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={strings.courseCode}
        placeholder={strings.courseCode}
        onChange={(evt) => {
          setFormData({ ...formData, courseCode: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <TextInput
        invalid={showError && !formData.courseDescription}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={strings.courseDescription}
        placeholder={strings.courseDescription}
        onChange={(evt) => {
          setFormData({ ...formData, courseDescription: evt.target?.value });
        }}
        light
      />
    </>
  );

  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={strings.createNewClass}
          descriptionText={strings.enterCourseInfo}
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

CreateClassModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func
};

export default CreateClassModal;
