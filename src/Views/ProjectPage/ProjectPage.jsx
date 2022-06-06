import React, { useEffect, useState } from "react";
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
import { getProjectByID } from "../../Utilities/ProjectUtils";

const INS = true;

const ProjectPage = () => {
  const { projectId } = useParams();
  const loggedUser = useAuthRedirect(true);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const [gradeModalVisible, setGradeModalVisible] = useState(false);
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    const getProjects = async () => {
      const prj = await getProjectByID(projectId);
      return { ...prj, ...{ id: projectId } };
    };

    getProjects()
      .then((projects) => {
        setProjectData(projects);
      })
      .catch((err) =>
        console.error(`Failed to get user projects, Error: ${err}`)
      );
  }, []);

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
          {selectedIndex === 0 && <ProjectHomePage projectData={projectData} />}
          {selectedIndex === 1 && (
            <TasksPage
              setCreateTaskModalVisible={setCreateTaskModalVisible}
              projectData={projectData}
            />
          )}
          {selectedIndex === 2 && (
            <GradesPage
              setGradeModalVisible={setGradeModalVisible}
              projectData={projectData}
            />
          )}
          {selectedIndex === 3 && (
            <SuggestedUserPage
              projectData={projectData}
              loggedUser={loggedUser}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
