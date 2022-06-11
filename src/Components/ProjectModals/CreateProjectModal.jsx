import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TextArea,
  TextInput,
  Dropdown,
  MultiSelect
} from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";
import { generalSkills, projectTypes } from "../../Constants/lookupConstants";
import { addNewProject } from "../../Utilities/ProjectUtils";
import { setGroupProject } from "../../Utilities/ClassUtils";

const CreateProjectModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  loggedUser,
  groupId
}) => {
  const formInitialState = {
    projectName: "",
    projectSubject: "",
    projectType: projectTypes[0],
    projectDescription: "",
    projectSkills: []
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
      !formData.projectName ||
      !formData.projectSubject ||
      !formData.projectType ||
      !formData.projectDescription
    ) {
      setShowError(true);
      return;
    }
    try {
      const createPrj = await addNewProject(
        formData.projectName,
        formData.projectDescription,
        formData.projectSkills,
        formData.projectSubject,
        formData.projectType,
        loggedUser?.user?.email
      );
      if (groupId) {
        await setGroupProject(groupId, createPrj?.id);
      }
      setSuccessMessage(true);
      setAlertMessage("Project Created!");
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
        invalid={showError && !formData.projectName}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Project Name"}
        placeholder={"Project Name"}
        onChange={(evt) => {
          setFormData({ ...formData, projectName: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <TextInput
        invalid={showError && !formData.projectSubject}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Project Subject"}
        placeholder={"Project Subject"}
        onChange={(evt) => {
          setFormData({ ...formData, projectSubject: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <TextArea
        invalid={showError && !formData.projectDescription}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={"Project Description"}
        placeholder={"Project Description"}
        onChange={(evt) => {
          setFormData({ ...formData, projectDescription: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <Dropdown
        titleText={"Type"}
        label={"Select Type"}
        items={projectTypes}
        itemToString={(item) => item || ""}
        onChange={(item) => {
          setFormData({
            ...formData,
            ...{ projectType: item.selectedItem }
          });
        }}
        initialSelectedItem={projectTypes[0]}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <MultiSelect
        label={`${strings.select} ${strings.interests}`}
        titleText={strings.interests}
        items={generalSkills.sort()}
        itemToString={(item) => item || ""}
        selectionFeedback="top-after-reopen"
        onChange={(items) => {
          setFormData({
            ...formData,
            ...{ projectSkills: items.selectedItems }
          });
        }}
        light
      />
    </>
  );

  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={strings.createNewProject}
          descriptionText={"Enter project details!"}
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

CreateProjectModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func,
  loggedUser: PropTypes.object,
  groupId: PropTypes.string
};

export default CreateProjectModal;
