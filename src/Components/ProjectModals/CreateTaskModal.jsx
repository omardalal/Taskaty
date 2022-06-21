import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextArea, TextInput, Dropdown } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";
import FileUploader from "../FileUploader/FileUploader";
import { createTask } from "../../Utilities/TaskUtils";

const CreateTaskModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  loggedUser,
  projectId,
  usersList
}) => {
  const formInitialState = {
    name: "",
    description: "",
    assignedTo: ""
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
  }, [visible]);

  useAOS();

  const handleSubmitPress = async () => {
    if (!formData.name || !formData.description) {
      setShowError(true);
      return;
    }
    try {
      await createTask(
        formData.name,
        projectId,
        formData.description,
        formData.assignedTo ?? "Unassigned",
        uploadedFiles,
        loggedUser?.user?.email
      );
      setSuccessMessage(true);
      setAlertMessage("Task Created!");
      setTimeout(() => {
        onSuccess?.();
      }, 600);
    } catch (error) {
      setAlertMessage("Something went wrong!");
    }
  };

  const getForm = () => (
    <>
      <TextInput
        invalid={showError && !formData.name}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Task Name"}
        placeholder={"Task Name"}
        onChange={(evt) => {
          setFormData({ ...formData, name: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <TextArea
        invalid={showError && !formData.description}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Task Description"}
        placeholder={"Task Description"}
        onChange={(evt) => {
          setFormData({ ...formData, description: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <Dropdown
        titleText={"Assigned To"}
        label={"Select User"}
        items={["Unassigned", ...usersList]}
        itemToString={(item) => item || ""}
        onChange={(item) => {
          setFormData({
            ...formData,
            ...{ assignedTo: item.selectedItem }
          });
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
          titleText={"Create new Task"}
          descriptionText={"Enter task details!"}
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

CreateTaskModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func,
  loggedUser: PropTypes.object,
  projectId: PropTypes.string,
  usersList: PropTypes.array
};

export default CreateTaskModal;
