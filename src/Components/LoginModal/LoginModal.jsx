import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TextInput } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/inputForm";
import Modal from "../Modal/Modal";
import AOS from "aos";
import "aos/dist/aos.css";

const LoginModal = ({ visible, onOverlayClick, onDismissPress }) => {
  const getLoginForm = () => (
    <>
      <TextInput
        data-modal-primary-focus
        labelText={strings.email}
        placeholder={strings.email}
        style={{ marginBottom: "1rem" }}
        light
      />
      <TextInput.PasswordInput
        data-modal-primary-focus
        labelText={strings.password}
        placeholder={strings.password}
        light
      />
    </>
  );
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={strings.login}
          descriptionText={"Enter your account credentials"}
          buttonText={strings.login}
          buttonOnClick={() => {
            console.log("Login");
          }}
          FormElement={getLoginForm()}
          minHeight={300}
          hasDismissButton
          onDismissPress={onDismissPress}
        />
      </div>
    </Modal>
  );
};

LoginModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func
};

export default LoginModal;
