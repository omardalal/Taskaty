import React from "react";
import { styles } from "./styles.ts";
import CustomButton from "../../Components/CustomButton/CustomButton";
import Attachment from "../../Components/Attachment/Attachment";
import PropTypes from "prop-types";

const beforeDeadline = true;

const GradesPage = ({ setGradeModalVisible, projectData, isInstructor }) => {
  const getSubmittedFilesBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <h3 style={styles.gradingBoxTitle}>{"Submitted Files"}</h3>
        <div style={styles.gradingAttachments}>
          <Attachment
            fileName={"File Name"}
            fileType={"Plain/Text"}
            showDownloadBtn
            showDeleteBtn={beforeDeadline && !isInstructor}
          />
          <div style={{ margin: "0 2.5px" }} />
          <Attachment
            fileName={"File Name"}
            fileType={"Plain/Text"}
            showDownloadBtn
            showDeleteBtn={beforeDeadline && !isInstructor}
          />
          <div style={{ margin: "0 2.5px" }} />
          <Attachment
            fileName={"File Name"}
            fileType={"Plain/Text"}
            showDownloadBtn
            showDeleteBtn={beforeDeadline && !isInstructor}
          />
        </div>
      </div>
    );
  };

  const getGradeBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.gradeRow}>
          <h2 style={styles.homeHeader2}>{"Final Grade"}</h2>
          <h2 style={styles.homeHeader2}>{"85%"}</h2>
        </div>
        <h2
          style={{ ...styles.homeHeader2, ...styles.projectDescriptionTitle }}
        >
          {"Instructor Comment"}
        </h2>
        <p style={styles.projectDescriptionBody}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel
          lacinia sem. Vivamus sodales leo fermentum lectus condimentum, id
          vestibulum ex maximus. Nam lobortis id mi eget interdum. Etiam quis
          ultrices eros. Sed nec dui ultrices, euismod lectus sit amet, auctor
          sapien. Nunc venenatis leo sed lorem venenatis, a blandit odio mollis.
        </p>
      </div>
    );
  };

  return (
    <div style={styles.gradesMainContainer}>
      <div style={styles.pageTitleContainer}>
        <h1 style={styles.pageTitle}>{"Project Grading"}</h1>
        <div style={styles.titleRightBtnContainer}>
          <CustomButton
            blackButton
            text={isInstructor ? "Grade Project" : "Submit Project"}
            onClick={() => setGradeModalVisible(true)}
            disabled={!beforeDeadline && !isInstructor}
          />
        </div>
      </div>
      <div>
        {getSubmittedFilesBox()}
        {getGradeBox()}
      </div>
    </div>
  );
};

GradesPage.propTypes = {
  setGradeModalVisible: PropTypes.func,
  projectData: PropTypes.object,
  isInstructor: PropTypes.bool
};

export default GradesPage;
