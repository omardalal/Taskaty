import React, { useState } from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CustomButton = (props) => {
  const { to, text, blackButton, onClick, inTopBar, disabled } = props;
  const [opacity, setOpacity] = useState(1);

  return (
    <>
      {to && !disabled ? (
        <Link
          aria-label={text}
          to={to}
          style={{
            ...styles.customBtn(opacity, inTopBar, disabled),
            ...(blackButton
              ? styles.customBtnBlackBg(disabled)
              : styles.customBtnWhiteBg(disabled))
          }}
          onClick={disabled ? undefined : onClick}
          onMouseEnter={() => {
            if (!disabled) setOpacity(0.75);
          }}
          onMouseLeave={() => setOpacity(1)}
        >
          {text}
        </Link>
      ) : (
        <a
          aria-label={text}
          style={{
            ...styles.customBtn(opacity, inTopBar, disabled),
            ...(blackButton
              ? styles.customBtnBlackBg(disabled)
              : styles.customBtnWhiteBg(disabled))
          }}
          onClick={disabled ? undefined : onClick}
          onMouseEnter={() => {
            if (!disabled) setOpacity(0.75);
          }}
          onMouseLeave={() => setOpacity(1)}
        >
          {text}
        </a>
      )}
    </>
  );
};

CustomButton.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  blackButton: PropTypes.bool,
  onClick: PropTypes.func,
  inTopBar: PropTypes.bool,
  disabled: PropTypes.bool
};

export default CustomButton;
