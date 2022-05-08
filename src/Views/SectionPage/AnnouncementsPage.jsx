import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import Attachment from "../../Components/Attachment/Attachment";
import CustomButton from "../../Components/CustomButton/CustomButton";

const AnnouncementsPage = ({ classId, setCreateAnnouncementModalVisible }) => {
  const getAnnouncements = () => {
    return (
      <div
        className="defaultBoxShadowBlack"
        style={styles.announcementContainer}
      >
        <h1 style={styles.announcementTitle}>Announcement Subject</h1>
        <h5 style={styles.announcementInstructorName}>Instructor Name</h5>
        <h5 style={styles.announcementH5}>Description</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel
          lacinia sem. Vivamus sodales leo fermentum lectus condimentum, id
          vestibulum ex maximus. Nam lobortis id mi eget interdum. Etiam quis
          ultrices eros. Sed nec dui ultrices, euismod lectus sit amet, auctor
          sapien. Nunc venenatis leo sed lorem venenatis, a blandit odio mollis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel
          lacinia sem. Vivamus sodales leo fermentum lectus condimentum, id
          vestibulum ex maximus. Nam lobortis id mi eget interdum. Etiam quis
          ultrices eros. Sed nec dui ultrices, euismod lectus sit amet, auctor
          sapien. Nunc venenatis leo sed lorem venenatis, a blandit odio mollis.
        </p>
        <h5 style={styles.announcementH5}>Attachments</h5>
        <div style={styles.announcementAttachments}>
          <Attachment fileName="File Name" fileType="Type" showDownloadBtn />
          <div style={{ marginRight: "1rem" }} />
          <Attachment fileName="File Name" fileType="Type" showDownloadBtn />
          <div style={{ marginRight: "1rem" }} />
          <Attachment fileName="File Name" fileType="Type" showDownloadBtn />
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={styles.tabPageMainContainer}>
        <div style={styles.pageTitleContainer}>
          <h1 style={styles.pageTitle}>{"Instructor Announcements"}</h1>
          <div style={styles.titleRightBtnContainer}>
            <CustomButton
              blackButton
              text="Create new announcement"
              onClick={() => setCreateAnnouncementModalVisible(true)}
            />
          </div>
        </div>
        {getAnnouncements()}
      </div>
    </>
  );
};

AnnouncementsPage.propTypes = {
  classId: PropTypes.string,
  setCreateAnnouncementModalVisible: PropTypes.func
};

export default AnnouncementsPage;
