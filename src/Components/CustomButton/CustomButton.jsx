import React from "react";
import "./CustomButton.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CustomButton = (props) => {
  const { to, text, blackButton } = props;
  return (
    <Link
      aria-label={text}
      to={to}
      className={`${
        blackButton ? "customBtnBlackBg" : "customBtnWhiteBg"
      } customBtn`}
    >
      <div>{text}</div>
    </Link>
  );
};

CustomButton.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  blackButton: PropTypes.bool
};

export default CustomButton;
