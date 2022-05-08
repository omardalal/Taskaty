import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ResultItem, {
  ResultIconTypes
} from "../../Components/ResultItem/ResultItem";

const ClassSectionsPage = ({ classId, setCreateSectionModalVisible }) => {
  const getSections = () => {
    const sectionsArray = [
      { sectionId: "123", studentsCount: 24, groupsCount: 12 },
      { sectionId: "345", studentsCount: 35, groupsCount: 7 },
      { sectionId: "678", studentsCount: 40, groupsCount: 14 }
    ];
    return (
      <>
        {sectionsArray.map((section, index) => (
          <ResultItem
            key={index}
            title={`Section ${section.sectionId}`}
            subtitle={`${section.studentsCount} Students`}
            extraInfo={`${section.groupsCount} Groups`}
            buttonText={"Visit Section"}
            resultIconType={ResultIconTypes.Class}
            onPressGoToUrl={"/class/123/456"}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <div style={styles.tabPageMainContainer}>
        <div style={styles.pageTitleContainer}>
          <h1 style={styles.pageTitle}>{"Class Sections"}</h1>
          <div style={styles.titleRightBtnContainer}>
            <CustomButton
              blackButton
              text="Create new section"
              onClick={() => setCreateSectionModalVisible(true)}
            />
          </div>
        </div>
        <div style={styles.groupsContainer}>{getSections()}</div>
      </div>
    </>
  );
};

ClassSectionsPage.propTypes = {
  classId: PropTypes.string,
  setCreateSectionModalVisible: PropTypes.func
};

export default ClassSectionsPage;
