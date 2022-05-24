import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import Attachment from "../../Components/Attachment/Attachment";
import CustomButton from "../../Components/CustomButton/CustomButton";

const AnnouncementsPage = ({
  classDetails,
  setCreateAnnouncementModalVisible,
  isInstructor
}) => {
  const getAnnouncements = () => {
    return (
      <>
        {classDetails.announcements?.length > 0 ? (
          classDetails.announcements?.map((announcement, index) => (
            <div
              key={index}
              className="defaultBoxShadowBlack"
              style={styles.announcementContainer}
            >
              <h1 style={styles.announcementTitle}>{announcement.title}</h1>
              <h5
                style={styles.announcementInstructorName}
              >{`${classDetails.instructor?.firstName} ${classDetails.instructor?.lastName}`}</h5>
              <h5 style={styles.descH5}>{"Description"}</h5>
              <p>{announcement.body}</p>
              <h5 style={styles.announcementH5}>{"Attachments"}</h5>
              <div style={styles.announcementAttachments}>
                {announcement.files?.map((file, index) => (
                  <Attachment
                    key={index}
                    fileName={file.fileName}
                    fileType={file.fileType}
                    showDownloadBtn
                    showDeleteBtn={false}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <h5 style={{ fontWeight: "400" }}>
            {"Announcements will appear here!"}
          </h5>
        )}
      </>
    );
  };

  return (
    <>
      <div style={styles.tabPageMainContainer}>
        <div style={styles.pageTitleContainer}>
          <h1 style={styles.pageTitle}>{"Instructor Announcements"}</h1>
          {isInstructor && (
            <div style={styles.titleRightBtnContainer}>
              <CustomButton
                blackButton
                text="Create new announcement"
                onClick={() => setCreateAnnouncementModalVisible(true)}
              />
            </div>
          )}
        </div>
        {getAnnouncements()}
      </div>
    </>
  );
};

AnnouncementsPage.propTypes = {
  classDetails: PropTypes.object,
  setCreateAnnouncementModalVisible: PropTypes.func,
  isInstructor: PropTypes.bool
};

export default AnnouncementsPage;
