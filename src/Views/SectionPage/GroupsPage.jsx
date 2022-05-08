import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ClassGroup from "../../Components/ClassGroup/ClassGroup";

const GroupsPage = ({ classId, sectionId, setCreateGroupModalVisible }) => {
  const getAvailableList = () => {
    const usersArray = [];
    for (let i = 0; i < 25; i++) {
      usersArray.push({ firstName: "Omar", lastName: "Dalal", userId: "123" });
    }
    return (
      <ClassGroup
        usersArray={usersArray}
        groupName={"Available Students"}
        long
      />
    );
  };

  const getGroups = () => {
    const usersArray = [
      { firstName: "Omar", lastName: "Dalal", userId: "123" },
      { firstName: "Ahmad", lastName: "Hamzah", userId: "345" },
      { firstName: "Mohamed", lastName: "Adra", userId: "678" }
    ];
    return (
      <>
        {Array.apply(null, Array(12)).map((_, index) => (
          <ClassGroup
            usersArray={usersArray}
            groupId={"12"}
            groupName={"Group A"}
            key={index}
          />
        ))}
      </>
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
  classId: PropTypes.string,
  sectionId: PropTypes.string,
  setCreateGroupModalVisible: PropTypes.func
};

export default GroupsPage;
