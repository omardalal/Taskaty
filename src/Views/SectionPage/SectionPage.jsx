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
  const classDetails = useFetchClasses(classId);

  const [sectionGroups, setSectionGroups] = useState([]);
  const [availableList, setAvailableList] = useState([]);

  useEffect(() => {
    if (!classDetails) {
      return;
    }

    if (sectionGroups.length) {
      return;
    }

    const sectionDetails = classDetails.Sections?.[Number(sectionId) - 1];
    let allStudentsInSection = classDetails.students?.filter(
      (student) => student.sectionNumber === sectionDetails?.sectionNumber
    );

    const getGroupsBySection = async (studentsArray, groupsArray) => {
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
      return { groups: groups, availableList: allStudentsInSection };
    };

    getGroupsBySection(classDetails.students, sectionDetails?.groups)
      .then((groupsInfo) => {
        setSectionGroups(groupsInfo.groups);
        setAvailableList(groupsInfo.availableList);
      })
      .catch((err) => console.error(`Failed to fetch groups, Error=${err}`));
  }, [classDetails]);

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
