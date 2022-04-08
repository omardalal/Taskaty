import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { Form, Button } from "carbon-components-react";
import { Close24 } from "@carbon/icons-react";

const InputForm = ({
  titleText,
  descriptionText,
  buttonText,
  buttonOnClick,
  FormElement,
  minHeight,
  hasDismissButton,
  onDismissPress,
  leftBtn,
  showAlert,
  alertMessage,
  alertSuccess
}) => {
  return (
    <Form
      style={styles.formButtonContainer(minHeight)}
      className={"defaultBoxShadowBlack"}
    >
      <div style={styles.formContainer}>
        <div style={styles.titleRow}>
          <h3 style={styles.title}>{titleText}</h3>
          {hasDismissButton && (
            <Close24 style={styles.dismissButton} onClick={onDismissPress} />
          )}
        </div>
        <p style={styles.formDesc}>{descriptionText}</p>
        {showAlert && (
          <p style={alertSuccess ? styles.successMsg : styles.errorMsg}>
            {alertMessage}
          </p>
        )}
        {FormElement}
      </div>
      <div style={styles.buttonRow}>
        {leftBtn}
        <Button style={styles.formBtn} onClick={buttonOnClick}>
          {buttonText}
        </Button>
      </div>
    </Form>
  );
};

InputForm.propTypes = {
  titleText: PropTypes.string,
  descriptionText: PropTypes.string,
  buttonText: PropTypes.string,
  buttonOnClick: PropTypes.func,
  FormElement: PropTypes.element,
  minHeight: PropTypes.number,
  hasDismissButton: PropTypes.bool,
  onDismissPress: PropTypes.func,
  leftBtn: PropTypes.element,
  showAlert: PropTypes.bool,
  alertMessage: PropTypes.string,
  alertSuccess: PropTypes.bool
};

export default InputForm;
