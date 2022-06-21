import React from "react";
import { styles } from "./styles.ts";
import CustomButton from "../../Components/CustomButton/CustomButton";
import Attachment from "../../Components/Attachment/Attachment";
import PropTypes from "prop-types";
import { deleteFileFromProjectSubmission } from "../../Utilities/TaskUtils";

const beforeDeadline = true;

const GradesPage = ({
  setGradeModalVisible,
  gradingData,
  isInstructor,
  submittedFiles,
  setSubmittedFiles
}) => {
  const getSubmittedFilesBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <h3 style={styles.gradingBoxTitle}>{"Submitted Files"}</h3>
        <div style={styles.gradingAttachments}>
          {submittedFiles?.length > 0 ? (
            submittedFiles?.map((attachment, index) => (
              <>
                <Attachment
                  fileName={attachment.fileName}
                  fileType={attachment.fileType}
                  link={attachment.link}
                  showDownloadBtn
                  showDeleteBtn={!isInstructor}
                  onDeletePress={async () => {
                    try {
                      await deleteFileFromProjectSubmission(
                        gradingData.id,
                        index
                      );
                      setSubmittedFiles(
                        submittedFiles?.filter((f, indx) => indx !== index)
                      );
                    } catch (err) {
                      console.error("Failed to delete file, Error: " + err);
                    }
                  }}
                />
                <div style={{ margin: "0 2.5px" }} />
              </>
            ))
          ) : (
            <h5>{"No files submitted yet!"}</h5>
          )}
        </div>
      </div>
    );
  };

  const getGradeBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.gradeRow}>
          <h2 style={styles.homeHeader2}>{"Final Grade"}</h2>
          <h2 style={styles.homeHeader2}>{gradingData?.grade ?? "N/A"}</h2>
        </div>
        <h2
          style={{ ...styles.homeHeader2, ...styles.projectDescriptionTitle }}
        >
          {"Instructor Comment"}
        </h2>
        <p style={styles.projectDescriptionBody}>
          {gradingData?.comment ?? "No comment yet!"}
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
  gradingData: PropTypes.object,
  isInstructor: PropTypes.bool,
  submittedFiles: PropTypes.array,
  setSubmittedFiles: PropTypes.func
};

export default GradesPage;
