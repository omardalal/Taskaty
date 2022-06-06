import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NumberInput } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";
import { createSection } from "../../Utilities/ClassUtils";

const CreateSectionModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  classId
}) => {
  const formInitialState = {
    maxNumberOfGroups: 0,
    maxNumberOfStudentsInGroup: 0
  };

  const [formData, setFormData] = useState(formInitialState);
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    setFormData(formInitialState);
    setAlertMessage("");
    setSuccessMessage(false);
  }, [visible]);

  useAOS();

  const handleSubmitPress = async () => {
    try {
      const maxInGroup =
        formData.maxNumberOfStudentsInGroup > 0
          ? formData.maxNumberOfStudentsInGroup
          : 9999999;
      const maxGroups =
        formData.maxNumberOfGroups > 0 ? formData.maxNumberOfGroups : 9999999;
      await createSection(maxGroups, maxInGroup, classId);
      setSuccessMessage(true);
      setAlertMessage("Section Created!");
      setTimeout(() => {
        onSuccess?.();
      }, 600);
    } catch (error) {
      console.log(error);
      setAlertMessage("Something went wrong!");
    }
  };

  const getForm = () => (
    <>
      <NumberInput
        hideSteppers
        data-modal-primary-focus
        invalidText={strings.fieldRequired}
        min={0}
        label={"Maximum number of groups"}
        helperText={"(0 means no limit)"}
        placeholder={"Maximum number of groups"}
        defaultValue={""}
        onChange={(evt) => {
          setFormData({ ...formData, maxNumberOfGroups: evt.target?.value });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <NumberInput
        hideSteppers
        data-modal-primary-focus
        min={0}
        invalidText={strings.fieldRequired}
        label={"Maximum number of students in group"}
        helperText={"(0 means no limit)"}
        placeholder={"Maximum number of students in group"}
        defaultValue={""}
        onChange={(evt) => {
          setFormData({
            ...formData,
            maxNumberOfStudentsInGroup: evt.target?.value
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
          titleText={"Create new section"}
          descriptionText={"Create a new section for this class"}
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

CreateSectionModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func,
  classId: PropTypes.string
};

export default CreateSectionModal;
