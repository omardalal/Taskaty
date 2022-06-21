import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import { styles } from "./styles.ts";
import TabsManager from "../../Components/TabsManager/TabsManager";
import SectionHomePage from "./SectionHomePage";
import AnnouncementsPage from "./AnnouncementsPage";
import CreateAnnouncementModal from "../../Components/ClassModals/CreateAnnouncementModal";
import CreateProjectModal from "../../Components/ProjectModals/CreateProjectModal";
import CreateGroupModal from "../../Components/ClassModals/CreateGroupModal";
import GroupsPage from "./GroupsPage";
import { useFetchClasses } from "../../CustomHooks/useFetchClasses";
import { getGroup, isInClass } from "../../Utilities/ClassUtils";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [createAnnouncementModalVisible, setCreateAnnouncementModalVisible] =
    useState(false);
  const [createProjectModalVisible, setCreateProjectModalVisible] = useState({
    visible: false,
    groupId: ""
  });
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [isUserAuthorized, setIsUserAuthorized] = useState(true);

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
              let res = studentsArray?.find(
                (student) => student.id === groupStudent.userRef.id
              );
              if (!res) {
                res =
                  groupStudent.userRef.id === classDetails.instructor.email
                    ? classDetails.instructor
                    : undefined;
              }
              return res;
            })
            ?.filter((student) => student != null);
          return { ...groupInfo, students: groupStudents, id: group.id };
        })
      );
      return { groups: groups ?? [], availableList: allStudentsInSection };
    };

    const userHasAccess = async () => {
      if (classDetails.instructor?.id === loggedUser?.user?.email) {
        return true;
      }
      return await isInClass(classId, loggedUser?.user?.email);
    };

    getGroupsBySection(classDetails.students, sectionDetails?.groups)
      .then((groupsInfo) => {
        setSectionGroups(groupsInfo.groups);
        setAvailableList(groupsInfo.availableList);
      })
      .catch((err) => console.error(`Failed to fetch groups, Error=${err}`));

    userHasAccess()
      .then((hasAccess) => {
        let isInSection = false;
        if (hasAccess?.sectionNumber) {
          isInSection = hasAccess?.sectionNumber === Number(sectionId);
        } else if (hasAccess) {
          isInSection = true;
        } else {
          isInSection = false;
        }
        setIsUserAuthorized(isInSection);
      })
      .catch((err) => console.error(`Failed to get user access, Error=${err}`));
  }, [classDetails, refreshFetch, doneFetchClassDetails]);

  if ((!classDetails || classDetails?.length === 0) && doneFetchClassDetails) {
    return (
      <h3 style={{ margin: "auto" }}>
        {"Sorry, couldn't find the page you're looking for!"}
      </h3>
    );
  }

  if (!isUserAuthorized && doneFetchClassDetails) {
    return (
      <h3 style={{ margin: "auto" }}>
        {"Sorry, you don't have access to view this page!"}
      </h3>
    );
  }

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
      loggedUser={loggedUser}
    />
  );

  const getCreateProjectModal = () => (
    <CreateProjectModal
      visible={createProjectModalVisible.visible}
      onDismissPress={() =>
        setCreateProjectModalVisible({ visible: false, groupId: "" })
      }
      onOverlayClick={() =>
        setCreateProjectModalVisible({ visible: false, groupId: "" })
      }
      onSuccess={() =>
        setCreateProjectModalVisible({ visible: false, groupId: "" })
      }
      loggedUser={loggedUser}
      groupId={createProjectModalVisible.groupId}
    />
  );

  return (
    <>
      {getCreateAnnouncementModal()}
      {getCreateGroupModal()}
      {getCreateProjectModal()}
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
              setCreateProjectModalVisible={setCreateProjectModalVisible}
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
