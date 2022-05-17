import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import { styles } from "./styles.ts";
import TabsManager from "../../Components/TabsManager/TabsManager";
import SectionHomePage from "./SectionHomePage";
import AnnouncementsPage from "./AnnouncementsPage";
import CreateAnnouncementModal from "../../Components/ClassModals/CreateAnnouncementModal";
import CreateGroupModal from "../../Components/ClassModals/CreateGroupModal";
import GroupsPage from "./GroupsPage";
import { useFetchClasses } from "../../CustomHooks/useFetchClasses";
import { getGroup } from "../../Utilities/ClassUtils";

const SectionPage = () => {
  const loggedUser = useAuthRedirect(true);

  const { classId, sectionId } = useParams();
  const [refreshFetch, setRefreshFetch] = useState(0);
  const [doneFetchClassDetails, setDoneFetchClassDetails] = useState(false);
  const classDetails = useFetchClasses(
    classId,
    refreshFetch,
    setDoneFetchClassDetails
  );

  const [sectionGroups, setSectionGroups] = useState([]);
  const [availableList, setAvailableList] = useState([]);

  useEffect(() => {
    if (!classDetails || !doneFetchClassDetails) {
      return;
    }

    const sectionDetails = classDetails.Sections?.[Number(sectionId) - 1];
    let allStudentsInSection = classDetails.students?.filter(
      (student) => student.sectionNumber === sectionDetails?.sectionNumber
    );

    const getGroupsBySection = async (studentsArray, groupsArray) => {
      if (!groupsArray || !studentsArray) {
        return;
      }
      const groups = await Promise.all(
        groupsArray?.map(async (group) => {
          const groupInfo = await getGroup(group.id);
          const groupStudents = groupInfo?.students
            ?.map((groupStudent) => {
              allStudentsInSection = allStudentsInSection.filter(
                (student) => groupStudent.userRef.id !== student.id
              );
              return studentsArray?.find(
                (student) => student.id === groupStudent.userRef.id
              );
            })
            ?.filter((student) => student != null);
          return { ...groupInfo, students: groupStudents, id: group.id };
        })
      );
      return { groups: groups ?? [], availableList: allStudentsInSection };
    };

    getGroupsBySection(classDetails.students, sectionDetails?.groups)
      .then((groupsInfo) => {
        setSectionGroups(groupsInfo.groups);
        setAvailableList(groupsInfo.availableList);
      })
      .catch((err) => console.error(`Failed to fetch groups, Error=${err}`));
  }, [classDetails, refreshFetch, doneFetchClassDetails]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [createAnnouncementModalVisible, setCreateAnnouncementModalVisible] =
    useState(false);

  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);

  const getCreateAnnouncementModal = () => (
    <CreateAnnouncementModal
      visible={createAnnouncementModalVisible}
      classId={classId}
      onDismissPress={() => setCreateAnnouncementModalVisible(false)}
      onOverlayClick={() => setCreateAnnouncementModalVisible(false)}
      onSuccess={() => {
        setCreateAnnouncementModalVisible(false);
        setRefreshFetch((val) => val + 1);
      }}
    />
  );

  const getCreateGroupModal = () => (
    <CreateGroupModal
      visible={createGroupModalVisible}
      classId={classId}
      sectionNumber={sectionId}
      onDismissPress={() => setCreateGroupModalVisible(false)}
      onOverlayClick={() => setCreateGroupModalVisible(false)}
      onSuccess={() => {
        setCreateGroupModalVisible(false);
        setRefreshFetch((val) => val + 1);
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
            <SectionHomePage
              classDetails={classDetails}
              sectionId={sectionId}
            />
          )}
          {selectedIndex === 1 && (
            <GroupsPage
              classDetails={classDetails}
              setCreateGroupModalVisible={setCreateGroupModalVisible}
              sectionId={sectionId}
              availableList={availableList}
              sectionGroups={sectionGroups}
              loggedUser={loggedUser}
              isInstructor={
                classDetails.instructor?.id === loggedUser?.user?.email
              }
            />
          )}
          {selectedIndex === 2 && (
            <AnnouncementsPage
              classDetails={classDetails}
              loggedUser={loggedUser}
              setCreateAnnouncementModalVisible={
                setCreateAnnouncementModalVisible
              }
              isInstructor={
                classDetails.instructor?.id === loggedUser?.user?.email
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SectionPage;
