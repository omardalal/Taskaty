import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextInput } from "carbon-components-react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import InputForm from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import {
  signInUser,
  sendResetEmail
} from "../../Utilities/AuthenticationUtils";
import { AuthErrorCodes } from "firebase/auth";
import { useAOS } from "../../CustomHooks/useAOS";

const LoginModal = ({
  visible,
  onOverlayClick,
  onDismissPress,
  onLoginSucceed
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [inForgotPassView, setInForgotPassView] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setShowError(false);
    setAlertMessage("");
    setInForgotPassView(false);
    setSuccessMessage(false);
  }, [visible]);

  useAOS();

  const handleLoginPress = async () => {
    if (inForgotPassView) {
      if (!email) {
        setShowError(true);
        return;
      }
      try {
        await sendResetEmail(email);
        setSuccessMessage(true);
        setAlertMessage(strings.emailSent);
      } catch (error) {
        if (error.code === AuthErrorCodes.INVALID_EMAIL) {
          setSuccessMessage(false);
          setAlertMessage(strings.invalidEmail);
          return;
        }
        setAlertMessage(strings.somethingWentWrong);
      }
      return;
    }
    if (!email || !password) {
      setShowError(true);
      return;
    }
    try {
      await signInUser(email, password);
      setAlertMessage("");
      onLoginSucceed();
    } catch (error) {
      setSuccessMessage(false);
      if (error.code === AuthErrorCodes.INVALID_EMAIL) {
        setAlertMessage(strings.invalidEmail);
        return;
      }
      if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
        setAlertMessage(strings.invalidPassword);
        return;
      }
      setAlertMessage(strings.somethingWentWrong);
    }
  };

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
      {!inForgotPassView && (
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
      )}
      <p
        style={styles.forgotPassword}
        onClick={() => {
          setInForgotPassView((forgotPass) => !forgotPass);
          setAlertMessage("");
          setPassword("");
          setShowError(false);
        }}
      >
        {inForgotPassView ? strings.back : strings.forgotYourPassword}
      </p>
    </>
  );

  return (
    <Modal visible={visible} onOverlayClick={onOverlayClick}>
      <div style={styles.formContainer} data-aos="fade-up">
        <InputForm
          titleText={strings.login}
          descriptionText={strings.enterAccountCredentials}
          buttonText={inForgotPassView ? strings.sendResetEmail : strings.login}
          buttonOnClick={handleLoginPress}
          FormElement={getLoginForm()}
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

LoginModal.propTypes = {
  visible: PropTypes.bool,
  onDismissPress: PropTypes.func,
  onOverlayClick: PropTypes.func,
  onLoginSucceed: PropTypes.func
};

export default LoginModal;
