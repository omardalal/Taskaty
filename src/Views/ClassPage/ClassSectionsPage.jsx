import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ResultItem, {
  ResultIconTypes
} from "../../Components/ResultItem/ResultItem";

const ClassSectionsPage = ({
  classDetails,
  setCreateSectionModalVisible,
  isInstructor,
  loggedUser
}) => {
  const getUserSection = () =>
    classDetails.students?.find(
      (student) => student.id === loggedUser.user?.email
    )?.sectionNumber;

  const getSections = () => {
    const studentsCount = classDetails.students?.length;
    return (
      <>
        {classDetails?.Sections?.length > 0 ? (
          classDetails.Sections?.map((section, index) => {
            const groupCount = section.groups?.length ?? 0;
            return (
              <ResultItem
                key={index}
                btnDisabled={getUserSection() !== index + 1 && !isInstructor}
                title={`Section ${section.sectionNumber}`}
                subtitle={`${studentsCount} ${
                  studentsCount === 1 ? "Student" : "Students"
                }`}
                extraInfo={`${groupCount} ${
                  groupCount === 1 ? "Group" : "Groups"
                }`}
                buttonText={"Visit Section"}
                resultIconType={ResultIconTypes.Class}
                onPressGoToUrl={`/class/${classDetails.id}/${section.sectionNumber}`}
              />
            );
          })
        ) : (
          <h5>{"No sections made yet!"}</h5>
        )}
      </>
    );
  };

  return (
    <>
      <div style={styles.tabPageMainContainer}>
        <div style={styles.pageTitleContainer}>
          <h1 style={styles.pageTitle}>{"Class Sections"}</h1>
          {isInstructor && (
            <div style={styles.titleRightBtnContainer}>
              <CustomButton
                blackButton
                text="Create new section"
                onClick={() => setCreateSectionModalVisible(true)}
              />
            </div>
          )}
        </div>
        <div style={styles.groupsContainer}>{getSections()}</div>
      </div>
    </>
  );
};

ClassSectionsPage.propTypes = {
  classDetails: PropTypes.object,
  setCreateSectionModalVisible: PropTypes.func,
  isInstructor: PropTypes.bool,
  loggedUser: PropTypes.object
};

export default ClassSectionsPage;
