import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ClassGroup from "../../Components/ClassGroup/ClassGroup";

const GroupsPage = ({
  classDetails,
  sectionId,
  loggedUser,
  isInstructor,
  availableList,
  sectionGroups,
  setCreateGroupModalVisible
}) => {
  const getAvailableList = () => (
    <ClassGroup
      usersArray={availableList}
      groupName={"Available Students"}
      long
    />
  );

  const getSectionDetails = () =>
    classDetails.Sections?.[Number(sectionId) - 1];

  const getGroups = () => (
    <>
      {sectionGroups.map((group, index) => (
        <ClassGroup
          usersArray={group.students}
          groupId={group.id}
          groupName={group.groupName}
          key={index}
          hideLeftBtn={
            !group.students?.some(
              (student) => student.id === loggedUser?.user?.email
            ) && !isInstructor
          }
          rightBtnDisabled={
            group.students?.length >= getSectionDetails().maxStudentsInGroup
          }
        />
      ))}
    </>
  );

  return (
    <>
      <div style={styles.tabPageMainContainer}>
        <div style={styles.pageTitleContainer}>
          <h1 style={styles.pageTitle}>{"Class Groups"}</h1>
          <div style={styles.titleRightBtnContainer}>
            <CustomButton
              blackButton
              disabled={
                sectionGroups?.length >= getSectionDetails().maxNumOfGroups
              }
              text="Create new group"
              onClick={() => setCreateGroupModalVisible(true)}
            />
          </div>
        </div>
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
  availableList: PropTypes.array,
  sectionGroups: PropTypes.array,
  loggedUser: PropTypes.object,
  isInstructor: PropTypes.bool
};

export default GroupsPage;
