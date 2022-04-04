import React, { useEffect } from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import AOS from "aos";
import "aos/dist/aos.css";

const Modal = ({ children, visible, onOverlayClick }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

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
