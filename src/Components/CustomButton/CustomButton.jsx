import React from "react";
import "./CustomButton.css";
import PropTypes from "prop-types";

const CustomButton = (props) => {
  const { href, text, blackButton } = props;
  return (
    <a
      aria-label={text}
      href={href}
      className={`${
        blackButton ? "customBtnBlackBg" : "customBtnWhiteBg"
      } customBtn`}
    >
      <div>{text}</div>
    </a>
  );
};

CustomButton.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  blackButton: PropTypes.bool
};

export default CustomButton;
