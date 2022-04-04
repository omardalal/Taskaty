import React, { useEffect, useRef } from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import AOS from "aos";
import useClickOutside from "../../CustomHooks/useClickOutside";
import "aos/dist/aos.css";

const Modal = ({ children, visible, onOverlayClick }) => {
  const childrenRef = useRef(null);

  useClickOutside(childrenRef, null, onOverlayClick);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div style={styles.overlay} data-aos={"fade-in"}>
      <div ref={childrenRef} style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  visible: PropTypes.bool,
  onOverlayClick: PropTypes.func
};

export default Modal;
