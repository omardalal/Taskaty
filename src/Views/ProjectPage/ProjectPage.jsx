import React, { useState } from "react";
import { styles } from "./styles.ts";
import TabsManager from "../../Components/TabsManager/TabsManager";
import { useParams } from "react-router-dom";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import ProjectHomePage from "./ProjectHomePage";
import TasksPage from "./TasksPage";
import GradesPage from "./GradesPage";
import CreateTaskModal from "../../Components/ProjectModals/CreateTaskModal";
import SuggestedUserPage from "./SuggestedUserPage";
import GradeProjectModal from "../../Components/ProjectModals/GradeProjectModal";
import SubmitProjectModal from "../../Components/ProjectModals/SubmitProjectModal";

const INS = true;

const ProjectPage = () => {
  const { projectId } = useParams();
  const loggedUser = useAuthRedirect(true);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const [gradeModalVisible, setGradeModalVisible] = useState(false);

  const getCreateTaskModal = () => (
    <CreateTaskModal
      visible={createTaskModalVisible}
      onDismissPress={() => setCreateTaskModalVisible(false)}
      onOverlayClick={() => setCreateTaskModalVisible(false)}
      onSuccess={() => setCreateTaskModalVisible(false)}
    />
  );

  const getGradeModal = () => (
    <>
      {INS ? (
        <GradeProjectModal
          visible={gradeModalVisible}
          onDismissPress={() => setGradeModalVisible(false)}
          onOverlayClick={() => setGradeModalVisible(false)}
          onSuccess={() => setGradeModalVisible(false)}
        />
      ) : (
        <SubmitProjectModal
          visible={gradeModalVisible}
          onDismissPress={() => setGradeModalVisible(false)}
          onOverlayClick={() => setGradeModalVisible(false)}
          onSuccess={() => setGradeModalVisible(false)}
        />
      )}
    </>
  );

  return (
    <>
      {getCreateTaskModal()}
      {getGradeModal()}
      <div
        style={{
          ...styles.mainContainer,
          ...(selectedIndex === 1 && { backgroundColor: "white" })
        }}
      >
        <TabsManager
          tabTitles={["Home", "Tasks", "Grading", "Suggested Users"]}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div style={styles.tabPage}>
          {selectedIndex === 0 && <ProjectHomePage />}
          {selectedIndex === 1 && (
            <TasksPage setCreateTaskModalVisible={setCreateTaskModalVisible} />
          )}
          {selectedIndex === 2 && (
            <GradesPage setGradeModalVisible={setGradeModalVisible} />
          )}
          {selectedIndex === 3 && <SuggestedUserPage />}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
