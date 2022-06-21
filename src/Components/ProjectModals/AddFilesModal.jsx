import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextArea, TextInput, Dropdown } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";
import FileUploader from "../FileUploader/FileUploader";

const AddFilesModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  loggedUser,
  onSubmit
}) => {
  const formInitialState = {};

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
    if (!uploadedFiles.length) {
      setShowError(true);
      return;
    }
    try {
      await onSubmit(uploadedFiles);
      setSuccessMessage(true);
      setAlertMessage("Files Added!");
      setTimeout(() => {
        onSuccess?.();
      }, 600);
    } catch (error) {
      setAlertMessage("Something went wrong!");
    }
  };

  const getForm = () => (
    <>
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
          titleText={"Add Files"}
          descriptionText={"Choose Files!"}
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

AddFilesModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func,
  loggedUser: PropTypes.object,
  onSubmit: PropTypes.func
};

export default AddFilesModal;
