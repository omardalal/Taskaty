/* eslint-disable indent */
import { Tag, TextArea } from "carbon-components-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Attachment from "../../Components/Attachment/Attachment";
import CustomButton from "../../Components/CustomButton/CustomButton";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import { TaskStatus } from "../ProjectPage/TasksPage";
import { styles } from "./styles.ts";
import { User16 } from "@carbon/icons-react";
import AddCommentModal from "../../Components/ProjectModals/AddCommentModal";
import AddFilesModal from "../../Components/ProjectModals/AddFilesModal";
import { useFetchProjectData } from "../../CustomHooks/useFetchProjectData";
import {
  approveSubmission,
  deleteFileFromSubmission,
  getSubmissionById,
  getTask,
  updateSubmissionDescription,
  uploadFileForTaskSubmission
} from "../../Utilities/TaskUtils";

const SubmissionPage = () => {
  const { submissionId } = useParams();
  const loggedUser = useAuthRedirect(true);

  const [addCommentModalVisible, setAddCommentModalVisible] = useState(false);
  const [addFilesModalVisible, setAddFilesModalVisible] = useState(false);

  const navigate = useNavigate();

  const taskInfo = {
    assignedTo: "User 1",
    status: TaskStatus.New,
    description: "Very Cool Task lol!",
    name: "Task Name"
  };

  const submissionInitialValues = {
    description: "Very Cool Submission lol!"
  };

  const [submissionValues, setSubmissionValues] = useState(
    submissionInitialValues
  );

  const [refreshData, setRefershData] = useState(0);
  const [taskSubValues, setTaskSubValues] = useState();
  const [taskValues, setTaskValues] = useState();

  useEffect(() => {
    const getTaskSubData = async () => await getSubmissionById(submissionId);

    getTaskSubData()
      .then((taskSubData) => {
        setTaskSubValues(taskSubData);
        submissionInitialValues.description = taskSubData?.description;
      })
      .catch((err) =>
        console.error("Failed to get task submission data, Error: " + err)
      );
  }, [loggedUser]);

  useEffect(() => {
    if (!taskSubValues || !loggedUser) {
      return;
    }
    const getTaskData = async () => await getTask(taskSubValues.taskId);

    getTaskData()
      .then((taskData) => {
        setTaskValues(taskData);
      })
      .catch((err) => console.error("Failed to get task data, Error: " + err));
  }, [loggedUser, taskSubValues]);

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
    taskSubValues?.taskId,
    refreshData
  );

  if (!isUserAuthorized) {
    return (
      <h3 style={{ margin: "auto" }}>
        {"Sorry, you don't have access to view this page!"}
      </h3>
    );
  }

  const getTaskInfoBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.taskInfoRow}>
          <h2>{taskInfo.name}</h2>
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Assigned To"}</h2>
          <h2 style={styles.header2}>{taskValues?.assignedTo}</h2>
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Status"}</h2>
          <h2 style={styles.header2}>{taskValues?.status}</h2>
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Created By"}</h2>
          <h2 style={styles.header2}>{taskValues?.createdBy}</h2>
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Created On"}</h2>
          <h2 style={styles.header2}>
            {taskValues?.createdOn?.toDate()?.toDateString()}
          </h2>
        </div>
      </div>
    );
  };

  const getDescriptionBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.titleBtnContainer}>
          <h2 style={styles.boxTitle}>{"Task Description"}</h2>
          <CustomButton
            blackButton
            text="Save"
            onClick={async () => {
              try {
                await updateSubmissionDescription(
                  submissionId,
                  submissionValues.description
                );
              } catch (err) {
                console.error("Failed to save comment, Error: " + err);
              }
            }}
            disabled={
              submissionInitialValues.description ===
              submissionValues.description
            }
          />
        </div>
        <TextArea
          style={styles.taskDescriptionBody}
          defaultValue={taskSubValues?.description}
          data-modal-primary-focus
          placeholder={"Task Description"}
          onChange={(evt) => {
            setSubmissionValues({
              ...submissionValues,
              description: evt.target?.value
            });
          }}
          light
        />
      </div>
    );
  };

  const getAttachmentsBox = () => {
    const attachments = taskSubValues?.files ?? [];
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.titleBtnContainer}>
          <h3 style={styles.boxTitle}>{"Submitted Files"}</h3>
          <CustomButton
            blackButton
            text="Add Files"
            onClick={() => setAddFilesModalVisible(true)}
          />
        </div>
        <div style={styles.attachmentsRow}>
          {attachments.length > 0 ? (
            attachments?.map((attachment, index) => (
              <>
                <Attachment
                  fileName={attachment.fileName}
                  fileType={attachment.fileType}
                  link={attachment.link}
                  showDownloadBtn
                  showDeleteBtn={!isInstructor}
                  onDeletePress={async () => {
                    try {
                      await deleteFileFromSubmission(submissionId, index);
                      setTaskSubValues({
                        ...taskSubValues,
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

  const getReviewsBox = () => {
    const approved = taskSubValues?.approvedBy ?? [];
    const pending =
      projectData?.members?.filter((member) => !approved?.includes(member)) ??
      [];

    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.titleBtnContainer}>
          <h3 style={styles.boxTitle}>{"Team Reviews"}</h3>
          <CustomButton
            blackButton
            text="Approve"
            onClick={async () => {
              try {
                await approveSubmission(loggedUser?.user?.email, submissionId);
                setTaskSubValues({
                  ...taskSubValues,
                  approvedBy: [
                    ...taskSubValues?.approvedBy,
                    loggedUser?.user?.email
                  ]
                });
              } catch (err) {
                console.error("Failed to approve submission, Error: " + err);
              }
            }}
            disabled={taskSubValues?.approvedBy?.includes(
              loggedUser?.user?.email
            )}
          />
        </div>
        <h3 style={styles.header2}>{"Approved"}</h3>
        <div style={styles.tagContainer}>
          {approved?.map((tag, index) => (
            <Tag key={index} type="green" renderIcon={User16}>
              {tag}
            </Tag>
          ))}
        </div>
        <h3 style={styles.header2}>{"Pending"}</h3>
        <div style={styles.tagContainer}>
          {pending?.map((tag, index) => (
            <Tag key={index} type="red" renderIcon={User16}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    );
  };

  const getCommentsBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.titleBtnContainer}>
          <h3 style={styles.boxTitle}>{"Comments"}</h3>
          <CustomButton
            blackButton
            text="Add Comment"
            onClick={() => setAddCommentModalVisible(true)}
          />
        </div>
        {taskSubValues?.comments?.length > 0 ? (
          taskSubValues?.comments?.map((comment, index) => (
            <div style={styles.commentBox} key={index}>
              <div style={styles.commentHeader}>
                <h2 style={styles.header2}>{comment.user}</h2>
                <h2 style={styles.header2}>
                  {comment.date?.toDate()?.toDateString()}
                </h2>
              </div>
              <p style={styles.commentBody}>{comment.body}</p>
            </div>
          ))
        ) : (
          <h5>{"No comments yet!"}</h5>
        )}
      </div>
    );
  };

  const getAddCommentModal = () => (
    <AddCommentModal
      visible={addCommentModalVisible}
      onDismissPress={() => setAddCommentModalVisible(false)}
      onOverlayClick={() => setAddCommentModalVisible(false)}
      onSuccess={(newComment) => {
        setAddCommentModalVisible(false);
        setTaskSubValues({
          ...taskSubValues,
          comments: [...taskSubValues?.comments, newComment]
        });
      }}
      submissionId={submissionId}
      loggedUser={loggedUser}
    />
  );

  const getAddFilesModal = () => (
    <AddFilesModal
      visible={addFilesModalVisible}
      onDismissPress={() => setAddFilesModalVisible(false)}
      onOverlayClick={() => setAddFilesModalVisible(false)}
      onSuccess={() => setAddFilesModalVisible(false)}
      onSubmit={async (uploadedFiles) => {
        try {
          await uploadFileForTaskSubmission(uploadedFiles, submissionId);
          const newFiles = uploadedFiles?.map((file) => ({
            fileName: file.name,
            fileType: file.type
          }));
          setTaskSubValues({
            ...taskSubValues,
            files: [...taskSubValues?.files, ...newFiles]
          });
        } catch (err) {
          console.error("Failed to upload files, Error: " + err);
        }
      }}
    />
  );

  return (
    <>
      {getAddCommentModal()}
      {getAddFilesModal()}
      <div style={styles.mainContainer}>
        <div style={styles.saveBtnContainer}>
          <CustomButton
            blackButton
            text="Go to Task"
            onClick={async () => {
              navigate(`/task/${taskSubValues?.taskId}`, { replace: true });
            }}
            disabled={!taskSubValues?.taskId}
          />
        </div>
        <div style={styles.rowContainer}>
          <div style={styles.leftContainer}>
            {getTaskInfoBox()}
            {getDescriptionBox()}
            {getAttachmentsBox()}
          </div>
          <div style={styles.rightContainer}>
            {getReviewsBox()}
            {getCommentsBox()}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionPage;
