import React, { useEffect, useState } from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import {
  User32,
  Task32,
  Notebook32,
  NotAvailable32
} from "@carbon/icons-react";
import { Link } from "react-router-dom";

export const ResultIconTypes = {
  User: "user",
  Project: "project",
  Class: "class"
};

const ResultItem = ({
  resultIconType,
  buttonText,
  title,
  subtitle,
  extraInfo,
  onPressGoToUrl,
  btnDisabled
}) => {
  const [mouseOver, setMouseOver] = useState(false);

  const getIcon = () => {
    if (resultIconType === ResultIconTypes.User) {
      return <User32 style={styles.resultItemIcon} />;
    }
    if (resultIconType === ResultIconTypes.Project) {
      return <Task32 style={styles.resultItemIcon} />;
    }
    if (resultIconType === ResultIconTypes.Class) {
      return <Notebook32 style={styles.resultItemIcon} />;
    }
    return <NotAvailable32 style={styles.resultItemIcon} />;
  };

  return (
    <div style={styles.resultItem}>
      {getIcon()}
      <div style={styles.resultItemText}>
        <h4 style={styles.resultItemTitle}>{title}</h4>
        <h5 style={styles.resultItemSubtitle}>{subtitle}</h5>
        <h5 style={styles.resultItemSubtitle}>{extraInfo}</h5>
      </div>
      <div
        style={styles.resultItemVisitBtn(mouseOver, btnDisabled)}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        {onPressGoToUrl && !btnDisabled ? (
          <Link to={onPressGoToUrl} style={styles.btnLink}>
            {buttonText}
          </Link>
        ) : (
          <div style={styles.btnLink}>{buttonText}</div>
        )}
      </div>
    </div>
  );
};

ResultItem.propTypes = {
  resultIconType: PropTypes.string,
  buttonText: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  extraInfo: PropTypes.string,
  onPressGoToUrl: PropTypes.string,
  btnDisabled: PropTypes.bool
};

export default ResultItem;
