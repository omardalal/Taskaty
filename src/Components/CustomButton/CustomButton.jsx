import React from "react";
import "./CustomButton.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CustomButton = (props) => {
  const { to, text, blackButton, onClick } = props;
  return (
    <>
      {to ? (
        <Link
          aria-label={text}
          to={to}
          className={`${
            blackButton ? "customBtnBlackBg" : "customBtnWhiteBg"
          } customBtn`}
          onClick={onClick}
        >
          <div>{text}</div>
        </Link>
      ) : (
        <a
          aria-label={text}
          to={to}
          className={`${
            blackButton ? "customBtnBlackBg" : "customBtnWhiteBg"
          } customBtn`}
          onClick={onClick}
        >
          <div>{text}</div>
        </a>
      )}
    </>
  );
};

CustomButton.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  blackButton: PropTypes.bool,
  onClick: PropTypes.func
};

export default CustomButton;
