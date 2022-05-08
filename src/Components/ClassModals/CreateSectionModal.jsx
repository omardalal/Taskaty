import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import { useAOS } from "../../CustomHooks/useAOS";

const CreateSectionModal = ({
  visible,
  newSectionId,
  onOverlayClick,
  onDismissPress,
  onSuccess,
  courseCode
}) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    setAlertMessage("");
    setSuccessMessage(false);
  }, [visible]);

  useAOS();

  const handleSubmitPress = async () => {
    onSuccess();
  };

  const getForm = () => (
    <>
      <h5
        style={{ margin: "15px 0" }}
      >{`Section #${newSectionId} will be created for class ${courseCode}!`}</h5>
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
  newSectionId: PropTypes.string,
  courseCode: PropTypes.string,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onSuccess: PropTypes.func
};

export default CreateSectionModal;
