import React, { useState } from "react";
import strings from "../../Constants/strings";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { UserFollow20 } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";
import { createInvitation } from "../../Utilities/InvitationUtils";
import { InvitationType } from "../../Views/NotificationsPage/NotificationsPage";

// usersArray: Array of {firstName, lastName, id}
const ClassGroup = ({
  groupId,
  groupName,
  projectId,
  usersArray,
  long,
  hideLeftBtn,
  hideRightBtn,
  rightBtnDisabled,
  setCreateProjectModalVisible,
  loggedUser,
  loggedUserGroup,
  setNotif,
  isPrj
}) => {
  const [rightBtnFocused, setRightBtnFocused] = useState(false);
  const [leftBtnFocused, setLeftBtnFocused] = useState(false);

  const navigate = useNavigate();

  const getUserRow = (username, userId) => (
    <div style={styles.nameRow}>
      <h4
        style={styles.nameText}
        onClick={() => navigate(`/profile/${userId}`, { replace: true })}
      >
        {userId}
      </h4>
      {!groupId && loggedUserGroup && (
        <div
          onClick={async () => {
            try {
              await createInvitation(
                loggedUser?.user?.email,
                userId,
                isPrj ? InvitationType.Project : InvitationType.Group,
                loggedUserGroup
              );
              setNotif({
                type: "success",
                visible: true,
                title: "Invitation Sent",
                subtitle: `You invited ${userId} to join your group`
              });
            } catch (err) {
              setNotif({
                type: "error",
                visible: true,
                title: "Invitation Failed",
                subtitle: "There was a problem sending your invitation"
              });
              console.error("Failed to send Invitation, Error: " + err);
            }
          }}
          style={styles.iconBtnContainer}
        >
          <UserFollow20 />
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.mainContainer(long)} className={"defaultBoxShadowBlack"}>
      <div style={styles.groupTitleContainer}>
        <h2 style={styles.groupTitleText}>{groupName}</h2>
      </div>
      <div style={styles.namesContainer(long)}>
        {usersArray?.length > 0 ? (
          usersArray.map((user) =>
            getUserRow(`${user.firstName} ${user.lastName}`, user.id)
          )
        ) : (
          <h5 style={{ fontWeight: "450", marginLeft: 15, marginBottom: 15 }}>
            {"No users found."}
          </h5>
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
                if (!projectId) {
                  setCreateProjectModalVisible({
                    visible: true,
                    groupId: groupId
                  });
                  return;
                }
                navigate(`/project/${projectId}`, { replace: true });
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
              onClick={async () => {
                if (usersArray?.length < 1 || rightBtnDisabled) {
                  return;
                }
                try {
                  await createInvitation(
                    loggedUser?.user?.email,
                    usersArray[0].id,
                    InvitationType.Group,
                    groupId
                  );
                  setNotif({
                    type: "success",
                    visible: true,
                    title: "Invitation Sent",
                    subtitle: `You asked to join group ${groupName}`
                  });
                } catch (err) {
                  console.error("Failed to send request, Error: " + err);
                }
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
  projectId: PropTypes.string,
  long: PropTypes.bool,
  hideLeftBtn: PropTypes.bool,
  hideRightBtn: PropTypes.bool,
  rightBtnDisabled: PropTypes.bool,
  setCreateProjectModalVisible: PropTypes.func,
  loggedUser: PropTypes.object,
  loggedUserGroup: PropTypes.string,
  setNotif: PropTypes.func,
  isPrj: PropTypes.bool
};

export default ClassGroup;
