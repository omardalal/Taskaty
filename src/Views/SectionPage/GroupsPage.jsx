/* eslint-disable indent */
import React, { useState } from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ClassGroup from "../../Components/ClassGroup/ClassGroup";
import { InlineNotification } from "carbon-components-react";

const GroupsPage = ({
  classDetails,
  sectionId,
  loggedUser,
  isInstructor,
  availableList,
  sectionGroups,
  setCreateGroupModalVisible,
  setCreateProjectModalVisible
}) => {
  const [notif, setNotif] = useState({
    type: "success",
    visible: false,
    title: "Invitation Sent",
    subtitle: "You invited userId to join your group"
  });

  const getAvailableList = () => (
    <ClassGroup
      usersArray={availableList}
      groupName={"Available Students"}
      long
      loggedUser={loggedUser}
      loggedUserGroup={
        sectionGroups.find((group) =>
          group.students?.some(
            (student) => student.id === loggedUser?.user?.email
          )
        )?.id
      }
      setNotif={setNotif}
    />
  );

  const getSectionDetails = () =>
    classDetails.Sections?.[Number(sectionId) - 1];

  const getGroups = () => (
    <>
      {sectionGroups?.length > 0 ? (
        sectionGroups.map((group, index) => (
          <ClassGroup
            usersArray={group.students}
            groupId={group.id}
            projectId={group.project}
            loggedUser={loggedUser}
            groupName={group.groupName}
            setNotif={setNotif}
            key={index}
            hideLeftBtn={
              !group.students?.some(
                (student) => student.id === loggedUser?.user?.email
              ) && !isInstructor
            }
            hideRightBtn={group.students?.some(
              (student) => student.id === loggedUser?.user?.email
            )}
            rightBtnDisabled={
              group.students?.length >=
                getSectionDetails()?.maxStudentsInGroup || isStudentInGroup()
            }
            setCreateProjectModalVisible={setCreateProjectModalVisible}
          />
        ))
      ) : (
        <h5 style={{ fontWeight: "400" }}>{"Groups will appear here!"}</h5>
      )}
    </>
  );

  const isStudentInGroup = () => {
    return sectionGroups.some((group) =>
      group.students?.some((student) => student.id === loggedUser?.user?.email)
    );
  };

  return (
    <>
      <div style={styles.tabPageMainContainer}>
        <div style={styles.pageTitleContainer}>
          <h1 style={styles.pageTitle}>{"Class Groups"}</h1>
          <div style={styles.titleRightBtnContainer}>
            <CustomButton
              blackButton
              disabled={
                sectionGroups?.length >= getSectionDetails()?.maxNumOfGroups ||
                isStudentInGroup()
              }
              text="Create new group"
              onClick={() => setCreateGroupModalVisible(true)}
            />
          </div>
        </div>
        {notif.visible && (
          <InlineNotification
            title={notif.title}
            kind={notif.type}
            subtitle={notif.subtitle}
            onCloseButtonClick={() => setNotif({ ...notif, visible: false })}
          />
        )}
        <div style={styles.groupsPageBodyContainer}>
          <div style={styles.groupsContainer}>{getGroups()}</div>
          <div style={styles.availableListContainer}>{getAvailableList()}</div>
        </div>
      </div>
    </>
  );
};

GroupsPage.propTypes = {
  classDetails: PropTypes.object,
  sectionId: PropTypes.string,
  setCreateGroupModalVisible: PropTypes.func,
  setCreateProjectModalVisible: PropTypes.func,
  availableList: PropTypes.array,
  sectionGroups: PropTypes.array,
  loggedUser: PropTypes.object,
  isInstructor: PropTypes.bool
};

export default GroupsPage;
