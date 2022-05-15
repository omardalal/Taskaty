import React, { useState } from "react";
import { styles } from "./styles.ts";
import CreateAnnouncementModal from "../../Components/ClassModals/CreateAnnouncementModal";
import TabsManager from "../../Components/TabsManager/TabsManager";
import AnnouncementsPage from "../SectionPage/AnnouncementsPage";
import { useParams } from "react-router-dom";
import ClassSectionsPage from "./ClassSectionsPage";
import CreateSectionModal from "../../Components/ClassModals/CreateSectionModal";
import { useFetchClasses } from "../../CustomHooks/useFetchClasses";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";

const ClassPage = () => {
  const { classId } = useParams();
  const loggedUser = useAuthRedirect(true);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [createAnnouncementModalVisible, setCreateAnnouncementModalVisible] =
    useState(false);
  const [createSectionModalVisible, setCreateSectionModalVisible] =
    useState(false);

  const classDetails = useFetchClasses(classId);

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
      classId={classDetails?.id}
      onDismissPress={() => setCreateSectionModalVisible(false)}
      onOverlayClick={() => setCreateSectionModalVisible(false)}
      onSuccess={() => {
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
              classDetails={classDetails}
              setCreateSectionModalVisible={setCreateSectionModalVisible}
              isInstructor={
                classDetails.instructor?.id === loggedUser?.user?.email
              }
              loggedUser={loggedUser}
            />
          )}
          {selectedIndex === 1 && (
            <AnnouncementsPage
              loggedUser={loggedUser}
              classDetails={classDetails}
              isInstructor={
                classDetails.instructor?.id === loggedUser?.user?.email
              }
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
