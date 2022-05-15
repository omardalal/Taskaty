import React, { useState } from "react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { UserFollow20 } from "@carbon/icons-react";

// usersArray: Array of {firstName, lastName, userId}
const ClassGroup = ({
  groupId,
  groupName,
  usersArray,
  long,
  hideLeftBtn,
  hideRightBtn,
  rightBtnDisabled
}) => {
  const [rightBtnFocused, setRightBtnFocused] = useState(false);
  const [leftBtnFocused, setLeftBtnFocused] = useState(false);

  const getUserRow = (username, userId) => (
    <div style={styles.nameRow}>
      <h4 style={styles.nameText}>{username}</h4>
      <div
        onClick={() => {
          console.log(`Request from user (loggedId) to user ${userId}`);
        }}
        style={styles.iconBtnContainer}
      >
        {!groupId && <UserFollow20 />}
      </div>
    </div>
  );

  return (
    <div style={styles.mainContainer(long)} className={"defaultBoxShadowBlack"}>
      <div style={styles.groupTitleContainer}>
        <h2 style={styles.groupTitleText}>{groupName}</h2>
      </div>
      <div style={styles.namesContainer(long)}>
        {usersArray.map((user) =>
          getUserRow(`${user.firstName} ${user.lastName}`, user.id)
        )}
      </div>
      {groupId && (
        <div style={styles.bottomButtonsContainer}>
          {!hideLeftBtn && (
            <div
              style={styles.leftBtn(leftBtnFocused)}
              onMouseEnter={() => setLeftBtnFocused(true)}
              onMouseLeave={() => setLeftBtnFocused(false)}
              onClick={() => {
                console.log("Visit Project");
              }}
            >
              {strings.visitProject}
            </div>
          )}
          {!hideRightBtn && (
            <div
              style={styles.rightBtn(rightBtnFocused, rightBtnDisabled)}
              onMouseEnter={() => setRightBtnFocused(true)}
              onMouseLeave={() => setRightBtnFocused(false)}
              onClick={() => {
                if (rightBtnDisabled) {
                  return;
                }
                console.log(`Request to join group with Id: ${groupId}`);
              }}
            >
              {strings.requestToJoin}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ClassGroup.propTypes = {
  usersArray: PropTypes.array,
  groupId: PropTypes.string,
  groupName: PropTypes.string,
  long: PropTypes.bool,
  hideLeftBtn: PropTypes.bool,
  hideRightBtn: PropTypes.bool,
  rightBtnDisabled: PropTypes.bool
};

export default ClassGroup;
