/* eslint-disable indent */
import { Tag, TextArea } from "carbon-components-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Attachment from "../../Components/Attachment/Attachment";
import CustomButton from "../../Components/CustomButton/CustomButton";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import { TaskStatus } from "../ProjectPage/TasksPage";
import { styles } from "./styles.ts";
import { User16 } from "@carbon/icons-react";
import AddCommentModal from "../../Components/ProjectModals/AddCommentModal";
import AddFilesModal from "../../Components/ProjectModals/AddFilesModal";

const SubmissionPage = () => {
  const { submissionId } = useParams();
  const loggedUser = useAuthRedirect(true);

  const [addCommentModalVisible, setAddCommentModalVisible] = useState(false);
  const [addFilesModalVisible, setAddFilesModalVisible] = useState(false);

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

  const getTaskInfoBox = () => {
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.taskInfoRow}>
          <h2>{taskInfo.name}</h2>
          <h2>{"#34"}</h2>
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Assigned To"}</h2>
          <h2 style={styles.header2}>{taskInfo.assignedTo}</h2>
        </div>
        <div style={styles.taskInfoRow}>
          <h2 style={styles.header2}>{"Status"}</h2>
          <h2 style={styles.header2}>{taskInfo.status}</h2>
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
        <div style={styles.titleBtnContainer}>
          <h2 style={styles.boxTitle}>{"Task Description"}</h2>
          <CustomButton
            blackButton
            text="Save"
            onClick={() => {
              alert("Save");
            }}
            disabled={
              submissionInitialValues.description ===
              submissionValues.description
            }
          />
        </div>
        <TextArea
          style={styles.taskDescriptionBody}
          defaultValue={submissionInitialValues.description}
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
    const attachments = [""];
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

  const getReviewsBox = () => {
    const tags = [
      "Member Name 1",
      "Member Name 2",
      "Member Name 3",
      "Member Name 4",
      "Member Name 5"
    ];
    return (
      <div style={styles.boxContainer} className={"defaultBoxShadowBlack"}>
        <div style={styles.titleBtnContainer}>
          <h3 style={styles.boxTitle}>{"Team Reviews"}</h3>
          <CustomButton
            blackButton
            text="Approve"
            onClick={() => console.log("Approve")}
          />
        </div>
        <h3 style={styles.header2}>{"Approved"}</h3>
        <div style={styles.tagContainer}>
          {tags?.slice(0, 3).map((tag, index) => (
            <Tag key={index} type="green" renderIcon={User16}>
              {tag}
            </Tag>
          ))}
        </div>
        <h3 style={styles.header2}>{"Pending"}</h3>
        <div style={styles.tagContainer}>
          {tags?.slice(3, 5).map((tag, index) => (
            <Tag key={index} type="red" renderIcon={User16}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    );
  };

  const getCommentsBox = () => {
    const comments = [
      {
        firstName: "User",
        lastName: "Name",
        date: "19-04-2022",
        body: "Comment Body lol!"
      }
    ];
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
        {comments.map((comment, index) => (
          <div style={styles.commentBox} key={index}>
            <div style={styles.commentHeader}>
              <h2
                style={styles.header2}
              >{`${comment.firstName} ${comment.lastName}`}</h2>
              <h2 style={styles.header2}>{comment.date}</h2>
            </div>
            <p style={styles.commentBody}>{comment.body}</p>
          </div>
        ))}
      </div>
    );
  };

  const getAddCommentModal = () => (
    <AddCommentModal
      visible={addCommentModalVisible}
      onDismissPress={() => setAddCommentModalVisible(false)}
      onOverlayClick={() => setAddCommentModalVisible(false)}
      onSuccess={() => setAddCommentModalVisible(false)}
    />
  );

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
      {getAddCommentModal()}
      {getAddFilesModal()}
      <div style={styles.mainContainer}>
        <div style={styles.saveBtnContainer}>
          <CustomButton
            blackButton
            text="Go to Task Board"
            onClick={() => alert("Task Board!")}
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
