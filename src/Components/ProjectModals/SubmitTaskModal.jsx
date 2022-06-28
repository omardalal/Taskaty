import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextArea } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";
import FileUploader from "../FileUploader/FileUploader";
import {
  addSubmission,
  uploadFileForTaskSubmission
} from "../../Utilities/TaskUtils";

const SubmitTaskModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  loggedUser,
  projectId,
  taskId
}) => {
  const formInitialState = {
    description: ""
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState(formInitialState);
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    setFormData(formInitialState);
    setShowError(false);
    setAlertMessage("");
    setSuccessMessage(false);
    setUploadedFiles([]);
  }, [visible]);

  useAOS();

  const handleSubmitPress = async () => {
    if (!formData.description || uploadedFiles?.length < 1) {
      setShowError(true);
      setAlertMessage("Please enter at least 1 file!");
      return;
    }
    try {
      const response = await addSubmission(
        loggedUser?.user?.email,
        taskId,
        projectId,
        formData.description,
        []
      );
      await uploadFileForTaskSubmission(uploadedFiles, response.id);
      setSuccessMessage(true);
      setAlertMessage("Task Submission Added!");
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
        invalid={showError && !formData.description}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Submission Description"}
        placeholder={"Submission Description"}
        onChange={(evt) => {
          setFormData({ ...formData, description: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <FileUploader
        filesArray={uploadedFiles}
        setFilesArray={setUploadedFiles}
        multiple
        title="Attachments"
      />
    </>
  );

  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={"Submit Task"}
          descriptionText={"Add new task submission!"}
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

SubmitTaskModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func,
  loggedUser: PropTypes.object,
  projectId: PropTypes.string,
  taskId: PropTypes.string
};

export default SubmitTaskModal;
