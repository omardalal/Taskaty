import React, { useEffect, useState } from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { useAOS } from "../../CustomHooks/useAOS";

const Modal = ({ children, visible, onOverlayClick }) => {
  useAOS();

  const [hidden, setHidden] = useState(visible);

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => {
        setHidden(true);
      }, 200);

      return () => {
        clearTimeout(timeout);
      };
    }
    setHidden(false);
  }, [visible]);

  if (hidden) {
    return null;
  }

  return (
    <div
      style={styles.overlay(visible)}
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
