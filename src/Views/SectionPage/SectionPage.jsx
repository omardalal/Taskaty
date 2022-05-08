import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import { styles } from "./styles.ts";
import TabsManager from "../../Components/TabsManager/TabsManager";
import SectionHomePage from "./SectionHomePage";
import AnnouncementsPage from "./AnnouncementsPage";
import CreateAnnouncementModal from "../../Components/ClassModals/CreateAnnouncementModal";
import CreateGroupModal from "../../Components/ClassModals/CreateGroupModal";
import GroupsPage from "./GroupsPage";

const SectionPage = () => {
  useAuthRedirect(true);
  const { classId, sectionId } = useParams();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [createAnnouncementModalVisible, setCreateAnnouncementModalVisible] =
    useState(false);

  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);

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

  const getCreateGroupModal = () => (
    <CreateGroupModal
      visible={createGroupModalVisible}
      onDismissPress={() => setCreateGroupModalVisible(false)}
      onOverlayClick={() => setCreateGroupModalVisible(false)}
      onSuccess={(groupName) => {
        console.log(groupName);
        setCreateGroupModalVisible(false);
      }}
    />
  );

  return (
    <>
      {getCreateAnnouncementModal()}
      {getCreateGroupModal()}
      <div style={styles.mainContainer}>
        <TabsManager
          tabTitles={["Home", "Groups", "Announcements"]}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div style={styles.tabPage}>
          {selectedIndex === 0 && (
            <SectionHomePage classId={classId} sectionId={sectionId} />
          )}
          {selectedIndex === 1 && (
            <GroupsPage
              setCreateGroupModalVisible={setCreateGroupModalVisible}
              classId={classId}
              sectionId={sectionId}
            />
          )}
          {selectedIndex === 2 && (
            <AnnouncementsPage
              classId={classId}
              sectionId={sectionId}
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

export default SectionPage;
