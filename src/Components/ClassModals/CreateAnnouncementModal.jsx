import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextInput, TextArea } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";
import FileUploader from "../FileUploader/FileUploader";

const CreateAnnouncementModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess
}) => {
  const formInitialState = {
    subject: "",
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
    if (!formData.subject || !formData.description) {
      setShowError(true);
      return;
    }
    onSuccess({ ...formData, uploadedFiles: uploadedFiles });
  };

  const getForm = () => (
    <>
      <TextInput
        invalid={showError && !formData.subject}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Subject"}
        placeholder={"Subject"}
        onChange={(evt) => {
          setFormData({ ...formData, subject: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <TextArea
        invalid={showError && !formData.description}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Description"}
        placeholder={"Description"}
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
          titleText={"Create new announcement"}
          descriptionText={"Enter announcement info"}
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

CreateAnnouncementModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func
};

export default CreateAnnouncementModal;
