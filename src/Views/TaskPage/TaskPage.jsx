/* eslint-disable indent */
import {
  Dropdown,
  InlineNotification,
  TextArea,
  TextInput
} from "carbon-components-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Attachment from "../../Components/Attachment/Attachment";
import CustomButton from "../../Components/CustomButton/CustomButton";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import { TaskStatus } from "../ProjectPage/TasksPage";
import { styles } from "./styles.ts";
import { CheckmarkFilled16, PendingFilled16 } from "@carbon/icons-react";
import AddFilesModal from "../../Components/ProjectModals/AddFilesModal";
import {
  deleteFileFromTask,
  editTask,
  getTask
} from "../../Utilities/TaskUtils";
import { useFetchProjectData } from "../../CustomHooks/useFetchProjectData";
import SubmitTaskModal from "../../Components/ProjectModals/SubmitTaskModal";

const TaskPage = () => {
  const { taskId } = useParams();
  const loggedUser = useAuthRedirect(true);

  const [taskInitialValues, setTaskInitialValues] = useState({});
  const [notif, setNotif] = useState({
    type: "success",
    visible: false,
    title: "Changes saved",
    subtitle: "Your changes have been saved successfully!"
  });

  const navigate = useNavigate();

  const [taskValues, setTaskValues] = useState({
    assignedTo: "",
    createdBy: "",
    status: TaskStatus.New,
    description: "",
    name: "",
    createdOn: "",
    files: []
  });
  const [addFilesModalVisible, setAddFilesModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(0);

  useEffect(() => {
    const getTaskData = async () => await getTask(taskId);

    getTaskData()
      .then((taskData) => {
        setTaskValues(taskData);
        setTaskInitialValues(taskData);
      })
      .catch((err) => console.error("Failed to get task data, Error: " + err));
  }, [loggedUser]);

  const [
    isInstructor,
    isInClass,
    isUserAuthorized,
    tasks,
    projectData,
    taskSubmissions
  ] = useFetchProjectData(
    loggedUser,
    taskValues?.projectId,
    taskId,
    refreshData
  );

  if (!isUserAuthorized) {
    return (
      <h3 style={{ margin: "auto" }}>
        {"Sorry, you don't have access to view this page!"}
      </h3>
    );
  }

  const getAssignedToDropDown = () => {
    const items = ["Unassigned", ...(projectData.members ?? [])];
    return (
      <div style={styles.taskInfoRow}>
        <h2 style={styles.header2}>{"Assigned To"}</h2>
        <Dropdown
          style={styles.dropdown}
          items={items}
          itemToString={(item) => item || ""}
          initialSelectedItem={taskValues.assignedTo}
          onChange={(item) => {
            setTaskValues({
              ...taskValues,
              assignedTo: item.selectedItem
            });
          }}
          light
        />
      </div>
    );
  };

  const getTaskInfoBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.taskInfoRow}>
          <TextInput
            style={styles.taskName}
            data-modal-primary-focus
            defaultValue={taskValues.name}
            placeholder={"Task Name"}
            onChange={(evt) => {
              setTaskValues({ ...taskValues, name: evt.target?.value });
            }}
            light
          />
          <h2 style={styles.header2}>{taskValues.id}</h2>
        </div>
        {getAssignedToDropDown()}
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Status"}</h2>
          <Dropdown
            style={styles.dropdown}
            items={[TaskStatus.New, TaskStatus.Active, TaskStatus.Closed]}
            itemToString={(item) => item || ""}
            initialSelectedItem={taskValues.status}
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
          <h2 style={styles.header2}>{taskValues.createdBy}</h2>
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Created On"}</h2>
          <h2 style={styles.header2}>
            {taskValues.createdOn?.toDate()?.toDateString()}
          </h2>
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
          defaultValue={taskValues.description}
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
    const attachments = taskValues.files;
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
          {attachments?.length > 0 ? (
            attachments.map((attachment, index) => (
              <>
                <Attachment
                  fileName={attachment.fileName}
                  fileType={"Plain/Text"}
                  showDownloadBtn
                  showDeleteBtn
                  onDeletePress={async () => {
                    try {
                      await deleteFileFromTask(taskId, index);
                      setTaskValues({
                        ...taskValues,
                        files: taskValues.files?.filter(
                          (f, indx) => indx !== index
                        )
                      });
                    } catch (err) {
                      console.error("Failed to delete file, Error: " + err);
                    }
                  }}
                />
                <div style={{ margin: "0 2.5px" }} />
              </>
            ))
          ) : (
            <p style={styles.header2}>{"No attachments added."}</p>
          )}
        </div>
      </div>
    );
  };

  const getSubmissionsBox = () => {
    const submissions = taskSubmissions
      ?.map((sub) => ({
        attachments: sub.files,
        submittedBy: sub.submittedBy,
        submissionStatus: projectData.members
          ?.filter((member) => member !== sub.submittedBy)
          ?.some((member) => !sub.approvedBy?.includes(member))
          ? "Pending"
          : "Approved",
        submissionDate: sub.submittedOn?.toDate()?.toDateString(),
        id: sub.id,
        compareDate: sub.submittedOn?.seconds
      }))
      ?.sort((sub1, sub2) => sub2.compareDate - sub1.compareDate);

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
                {submission.submissionStatus?.toLowerCase() ===
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
                      submission.submissionStatus?.toLowerCase() ===
                        "Approved".toLowerCase()
                    )}
                  />
                )}
                <h3 style={styles.header2}>{submission.submissionStatus}</h3>
                <div style={styles.goToSubmissionBtn}>
                  <CustomButton
                    blackButton
                    text="Open"
                    onClick={() =>
                      navigate(`/submission/${submission.id}`, {
                        replace: true
                      })
                    }
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
                        fileName={attachment.fileName}
                        fileType={attachment.fileType}
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

  const getSubmitModal = () => (
    <SubmitTaskModal
      visible={submitModalVisible}
      onDismissPress={() => setSubmitModalVisible(false)}
      onOverlayClick={() => setSubmitModalVisible(false)}
      onSuccess={() => {
        setSubmitModalVisible(false);
        setRefreshData((prv) => prv + 1);
      }}
      loggedUser={loggedUser}
      projectId={taskValues?.projectId}
      taskId={taskId}
    />
  );

  return (
    <>
      {getAddFilesModal()}
      {getSubmitModal()}
      <div style={styles.mainContainer}>
        {notif.visible && (
          <InlineNotification
            title={notif.title}
            kind={notif.type}
            subtitle={notif.subtitle}
            onCloseButtonClick={() => setNotif({ ...notif, visible: false })}
          />
        )}
        <div style={styles.saveBtnContainer}>
          <CustomButton
            blackButton
            text="Go back to project"
            onClick={
              taskValues.projectId
                ? () =>
                    navigate(`/project/${taskValues?.projectId}`, {
                      replace: true
                    })
                : undefined
            }
          />
          <div style={styles.topRightBtnContainer}>
            <CustomButton
              blackButton
              text="Add Submission"
              onClick={() => setSubmitModalVisible(true)}
            />
            <div style={{ marginRight: 5 }} />
            <CustomButton
              blackButton
              text="Save Changes"
              onClick={async () => {
                try {
                  await editTask(taskId, taskValues);
                  setNotif({
                    type: "success",
                    visible: true,
                    title: "Changes saved",
                    subtitle: "Your changes have been saved successfully!"
                  });
                } catch (err) {
                  setNotif({
                    type: "error",
                    visible: true,
                    title: "Changes not saved",
                    subtitle: "Failed to save your changes!"
                  });
                  console.error("Failed to edit task, Error: " + err);
                }
              }}
              disabled={
                JSON.stringify(taskValues) === JSON.stringify(taskInitialValues)
              }
            />
          </div>
        </div>
        <div style={styles.rowContainer}>
          <div style={styles.leftContainer}>
            {projectData.name && getTaskInfoBox()}
            {projectData.description && getDescriptionBox()}
            {getAttachmentsBox()}
          </div>
          <div style={styles.rightContainer}>{getSubmissionsBox()}</div>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
