import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import { Tag } from "carbon-components-react";
import { User16 } from "@carbon/icons-react";
import CustomButton from "../../Components/CustomButton/CustomButton";

const SectionHomePage = ({ classDetails, sectionId }) => {
  const getDescBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.sectionHomePageTitleRow}>
          <h1 style={styles.courseDescTitle}>{classDetails.courseName}</h1>
          <h4>{classDetails.courseCode}</h4>
        </div>
        <h2 style={styles.homeHeader2Light}>{`Section #${sectionId}`}</h2>
        <h2
          style={styles.homeHeader2Light}
        >{`${classDetails.instructor?.firstName} ${classDetails.instructor?.lastName}`}</h2>
        <h2 style={{ ...styles.homeHeader2, ...styles.courseDescriptionTitle }}>
          Description
        </h2>
        <p style={styles.courseDescriptionBody}>{classDetails.courseDesc}</p>
      </div>
    );
  };

  const getStudentsBySection = (studentsArray, sectionNumber) => {
    return studentsArray?.filter(
      (student) => student.sectionNumber === sectionNumber
    );
  };

  const getMembers = () => {
    const sectionDetails = classDetails.Sections?.[Number(sectionId) - 1];
    const students = getStudentsBySection(
      classDetails.students,
      sectionDetails?.sectionNumber
    );
    return (
      <>
        <h2 style={{ ...styles.homeHeader2, ...styles.membersTitle }}>
          Section Members
        </h2>
        <div style={styles.membersContainer}>
          {students?.map((student, index) => (
            <Tag key={index} type="cool-gray" renderIcon={User16}>
              {`${student.firstName} ${student.lastName}`}
            </Tag>
          ))}
        </div>
      </>
    );
  };

  const getInfoBox = () => {
    const sectionDetails = classDetails.Sections?.[Number(sectionId) - 1];
    const groupsLength = sectionDetails?.groups?.length;
    const studentsLength = sectionDetails?.groups?.length;

    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.homeInfoTopRow}>
          <div style={styles.homeInfoCol}>
            <h2 style={styles.homeHeader2}>{"Section Information"}</h2>
            <p>{`${studentsLength} ${
              studentsLength ? "Students" : "Student"
            }`}</p>
            <p>{`${groupsLength} ${groupsLength > 1 ? "Groups" : "Group"}`}</p>
          </div>
          <div style={styles.homeInfoCol}>
            <h2 style={styles.homeHeader2}>{"Section join code"}</h2>
            {classDetails.id && sectionId && (
              <p style={styles.joinCode}>{`${btoa(
                `${classDetails.id}-${sectionId}`
              )}`}</p>
            )}
            <p style={styles.joinHint}>
              {"This code can be used to join this section"}
            </p>
          </div>
        </div>
        {getMembers()}
      </div>
    );
  };

  return (
    <div style={styles.homeMainContainer}>
      {getDescBox()}
      {getInfoBox()}
    </div>
  );
};

SectionHomePage.propTypes = {
  classDetails: PropTypes.object,
  sectionId: PropTypes.string
};

export default SectionHomePage;
