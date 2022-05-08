import React, { useState } from "react";
import { styles } from "./styles.ts";
import CreateAnnouncementModal from "../../Components/ClassModals/CreateAnnouncementModal";
import TabsManager from "../../Components/TabsManager/TabsManager";
import AnnouncementsPage from "../SectionPage/AnnouncementsPage";
import { useParams } from "react-router-dom";
import ClassSectionsPage from "./ClassSectionsPage";
import CreateSectionModal from "../../Components/ClassModals/CreateSectionModal";

const ClassPage = () => {
  const { classId } = useParams();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [createAnnouncementModalVisible, setCreateAnnouncementModalVisible] =
    useState(false);
  const [createSectionModalVisible, setCreateSectionModalVisible] =
    useState(false);

  const getCreateAnnouncementModal = () => (
    <CreateAnnouncementModal
      visible={createAnnouncementModalVisible}
      onDismissPress={() => setCreateAnnouncementModalVisible(false)}
      onOverlayClick={() => setCreateAnnouncementModalVisible(false)}
      onSuccess={(announcement) => {
        console.log(announcement);
        setCreateAnnouncementModalVisible(false);
      }}
    />
  );

  const getCreateSectionModal = () => (
    <CreateSectionModal
      visible={createSectionModalVisible}
      courseCode={"COMP334"}
      newSectionId={"4"}
      onDismissPress={() => setCreateSectionModalVisible(false)}
      onOverlayClick={() => setCreateSectionModalVisible(false)}
      onSuccess={() => {
        console.log("Create Section!");
        setCreateSectionModalVisible(false);
      }}
    />
  );

  return (
    <>
      {getCreateAnnouncementModal()}
      {getCreateSectionModal()}
      <div style={styles.mainContainer}>
        <TabsManager
          tabTitles={["Sections", "Announcements"]}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div style={styles.tabPage}>
          {selectedIndex === 0 && (
            <ClassSectionsPage
              classId={classId}
              setCreateSectionModalVisible={setCreateSectionModalVisible}
            />
          )}
          {selectedIndex === 1 && (
            <AnnouncementsPage
              classId={classId}
              setCreateAnnouncementModalVisible={
                setCreateAnnouncementModalVisible
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ClassPage;
