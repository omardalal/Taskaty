import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextInput } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/inputForm";
import Modal from "../Modal/Modal";
import AOS from "aos";
import "aos/dist/aos.css";

const LoginModal = ({ visible, onOverlayClick, onDismissPress }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const getLoginForm = () => (
    <>
      <TextInput
        invalid={showError && !email}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={strings.email}
        placeholder={strings.email}
        onChange={(evt) => {
          setEmail(evt.target?.value);
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <TextInput.PasswordInput
        invalid={showError && !password}
        invalidText={strings.fieldRequired}
        data-modal-primary-focus
        labelText={strings.password}
        placeholder={strings.password}
        onChange={(evt) => {
          setPassword(evt.target?.value);
        }}
        light
      />
    </>
  );

  useEffect(() => {
    setEmail("");
    setPassword("");
    setShowError(false);
  }, [visible]);

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
            if (!email || !password) {
              setShowError(true);
            }
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
