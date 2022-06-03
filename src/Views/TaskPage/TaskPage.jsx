/* eslint-disable indent */
import { Dropdown, TextArea, TextInput } from "carbon-components-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Attachment from "../../Components/Attachment/Attachment";
import CustomButton from "../../Components/CustomButton/CustomButton";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import { TaskStatus } from "../ProjectPage/TasksPage";
import { styles } from "./styles.ts";
import { CheckmarkFilled16, PendingFilled16 } from "@carbon/icons-react";
import { gray10 } from "@carbon/colors";
import AddFilesModal from "../../Components/ProjectModals/AddFilesModal";

const TaskPage = () => {
  const { taskId } = useParams();
  const loggedUser = useAuthRedirect(true);

  const taskInitialValues = {
    assignedTo: "User 1",
    status: TaskStatus.New,
    description: "Very Cool Task lol!",
    name: "Task Name"
  };

  const [taskValues, setTaskValues] = useState(taskInitialValues);
  const [addFilesModalVisible, setAddFilesModalVisible] = useState(false);

  const getTaskInfoBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.taskInfoRow}>
          <TextInput
            style={styles.taskName}
            data-modal-primary-focus
            defaultValue={taskInitialValues.name}
            placeholder={"Task Name"}
            onChange={(evt) => {
              setTaskValues({ ...taskValues, name: evt.target?.value });
            }}
            light
          />
          <h2 style={styles.header2}>{"#34"}</h2>
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Assigned To"}</h2>
          <Dropdown
            style={styles.dropdown}
            items={["Unassigned", "User 1", "User 2", "User 3"]}
            itemToString={(item) => item || ""}
            initialSelectedItem={taskInitialValues.assignedTo}
            onChange={(item) => {
              setTaskValues({
                ...taskValues,
                assignedTo: item.selectedItem
              });
            }}
            light
          />
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Status"}</h2>
          <Dropdown
            style={styles.dropdown}
            items={[TaskStatus.New, TaskStatus.Active, TaskStatus.Closed]}
            itemToString={(item) => item || ""}
            initialSelectedItem={taskInitialValues.status}
            onChange={(item) => {
              setTaskValues({
                ...taskValues,
                status: item.selectedItem
              });
            }}
            light
          />
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Created By"}</h2>
          <h2 style={styles.header2}>{"User Name"}</h2>
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Created On"}</h2>
          <h2 style={styles.header2}>{"12-02-2021"}</h2>
        </div>
      </div>
    );
  };

  const getDescriptionBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <h2 style={styles.boxTitle}>{"Task Description"}</h2>
        <TextArea
          style={styles.taskDescriptionBody}
          defaultValue={taskInitialValues.description}
          data-modal-primary-focus
          placeholder={"Task Description"}
          onChange={(evt) => {
            setTaskValues({ ...taskValues, description: evt.target?.value });
          }}
          light
        />
      </div>
    );
  };

  const getAttachmentsBox = () => {
    const attachments = [""];
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.titleBtnContainer}>
          <h3 style={styles.boxTitle}>{"Attached Files"}</h3>
          <CustomButton
            blackButton
            text="Add Files"
            onClick={() => setAddFilesModalVisible(true)}
          />
        </div>
        <div style={styles.attachmentsRow}>
          {attachments.length > 0 ? (
            <>
              <Attachment
                fileName={"File Name"}
                fileType={"Plain/Text"}
                showDownloadBtn
                showDeleteBtn
              />
              <div style={{ margin: "0 2.5px" }} />
              <Attachment
                fileName={"File Name"}
                fileType={"Plain/Text"}
                showDownloadBtn
                showDeleteBtn
              />
              <div style={{ margin: "0 2.5px" }} />
              <Attachment
                fileName={"File Name"}
                fileType={"Plain/Text"}
                showDownloadBtn
                showDeleteBtn
              />
              <div style={{ margin: "0 2.5px" }} />
            </>
          ) : (
            <p style={styles.header2}>{"No attachments added."}</p>
          )}
        </div>
      </div>
    );
  };

  const getSubmissionsBox = () => {
    const submissions = [
      {
        attachments: ["", "", ""],
        submittedBy: "User Name!",
        submissionStatus: "Pending",
        submissionDate: "12-04-2022"
      },
      {
        attachments: ["", "", ""],
        submittedBy: "User Name!",
        submissionStatus: "Approved",
        submissionDate: "08-04-2022"
      },
      {
        attachments: ["", "", ""],
        submittedBy: "User Name!",
        submissionStatus: "Approved",
        submissionDate: "08-04-2022"
      }
    ];
    // ****Sort by date****
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <h3 style={styles.boxTitle}>{"Submissions"}</h3>
        {submissions.length > 0 ? (
          submissions.map((submission, index) => (
            <div
              style={{ ...styles.boxContainer, ...styles.submissionBox }}
              key={index}
            >
              <div style={styles.submissionVersionTag(index === 0)}>
                <h3 style={{ fontSize: 15 }}>
                  {index === 0 ? "Latest Version" : "Newer Version Exists"}
                </h3>
              </div>
              <div style={styles.submissionStatusRow}>
                {submission.submissionStatus.toLowerCase() ===
                "Approved".toLowerCase() ? (
                  <CheckmarkFilled16
                    style={styles.submissionStatusIcon(
                      submission.submissionStatus.toLowerCase() ===
                        "Approved".toLowerCase()
                    )}
                  />
                ) : (
                  <PendingFilled16
                    style={styles.submissionStatusIcon(
                      submission.submissionStatus.toLowerCase() ===
                        "Approved".toLowerCase()
                    )}
                  />
                )}
                <h3 style={styles.header2}>{submission.submissionStatus}</h3>
                <div style={styles.goToSubmissionBtn}>
                  <CustomButton
                    blackButton
                    text="Open"
                    onClick={() => alert("SUBMISSION!")}
                  />
                </div>
              </div>
              <div style={styles.submittedByContainer}>
                <h2 style={styles.header2Light}>
                  <strong>{"Submitted By "}</strong>
                  {submission.submittedBy}
                </h2>
              </div>
              <div style={styles.submissionBottomRow}>
                <div style={styles.attachmentsRow}>
                  {submission.attachments?.map((attachment) => (
                    <>
                      <Attachment
                        fileName={"File Name"}
                        fileType={"Plain/Text"}
                        showDownloadBtn
                        light
                      />
                      <div style={{ margin: "0 2.5px" }} />
                    </>
                  ))}
                </div>
                <div style={styles.submissionDateContainer}>
                  <h3 style={styles.header2}>{submission.submissionDate}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.header2}>{"No submissions yet."}</p>
        )}
      </div>
    );
  };

  const getAddFilesModal = () => (
    <AddFilesModal
      visible={addFilesModalVisible}
      onDismissPress={() => setAddFilesModalVisible(false)}
      onOverlayClick={() => setAddFilesModalVisible(false)}
      onSuccess={() => setAddFilesModalVisible(false)}
      onSubmit={() => console.log("Enter async func here")}
    />
  );

  return (
    <>
      {getAddFilesModal()}
      <div style={styles.mainContainer}>
        <div style={styles.saveBtnContainer}>
          <CustomButton
            blackButton
            text="Go to Task Board"
            onClick={() => alert("Task Board!")}
          />
          <CustomButton
            blackButton
            text="Save Changes"
            onClick={() => {
              console.log(taskValues);
            }}
            disabled={
              JSON.stringify(taskValues) === JSON.stringify(taskInitialValues)
            }
          />
        </div>
        <div style={styles.rowContainer}>
          <div style={styles.leftContainer}>
            {getTaskInfoBox()}
            {getDescriptionBox()}
            {getAttachmentsBox()}
          </div>
          <div style={styles.rightContainer}>{getSubmissionsBox()}</div>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
