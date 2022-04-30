import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { useAOS } from "../../CustomHooks/useAOS";

const Modal = ({ children, visible, onOverlayClick }) => {
  useAOS();

  if (!visible) {
    return null;
  }

  return (
    <div
      style={styles.overlay}
      data-aos={"fade-in"}
      onClick={(evt) => {
        if (evt.target === evt.currentTarget) {
          onOverlayClick();
        }
      }}
    >
      <div>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  visible: PropTypes.bool,
  onOverlayClick: PropTypes.func
};

export default Modal;
