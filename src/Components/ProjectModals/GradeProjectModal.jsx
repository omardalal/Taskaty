import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextArea, NumberInput } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";
import { gradeProject } from "../../Utilities/TaskUtils";

const GradeProjectModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  loggedUser,
  prjSubmissionId
}) => {
  const formInitialState = {
    grade: "",
    description: ""
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
    if (!formData.grade) {
      setShowError(true);
      return;
    }
    try {
      await gradeProject(prjSubmissionId, formData.description, formData.grade);
      setSuccessMessage(true);
      setAlertMessage("Project Graded!");
      setTimeout(() => {
        onSuccess?.({ grade: formData.grade, comment: formData.description });
      }, 600);
    } catch (error) {
      setAlertMessage("Something went wrong!");
    }
  };

  const getForm = () => (
    <>
      <NumberInput
        invalid={showError && !formData.grade}
        hideSteppers
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Project Grade"}
        placeholder={"Project Grade"}
        onChange={(evt) => {
          setFormData({ ...formData, grade: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <TextArea
        data-modal-primary-focus
        labelText={"Grade Description"}
        placeholder={"Grade Description"}
        onChange={(evt) => {
          setFormData({ ...formData, description: evt.target?.value });
        }}
        light
      />
    </>
  );

  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={"Grade Project"}
          descriptionText={"Enter project grade!"}
          buttonText={"Grade"}
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

GradeProjectModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func,
  loggedUser: PropTypes.object,
  prjSubmissionId: PropTypes.string
};

export default GradeProjectModal;
