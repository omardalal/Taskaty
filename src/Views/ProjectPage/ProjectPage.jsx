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
import { useFetchProjectData } from "../../CustomHooks/useFetchProjectData";
import AddFilesModal from "../../Components/ProjectModals/AddFilesModal";
import { uploadFileForProjectSubmission } from "../../Utilities/TaskUtils";

const ProjectPage = () => {
  const { projectId } = useParams();
  const loggedUser = useAuthRedirect(true);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const [gradeModalVisible, setGradeModalVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(0);
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [gradingDataState, setGradingDataState] = useState({});

  const [
    isInstructor,
    isInClass,
    isUserAuthorized,
    tasks,
    projectData,
    submissions,
    gradingData
  ] = useFetchProjectData(loggedUser, projectId, undefined, refreshData);

  useEffect(() => {
    setSubmittedFiles(gradingData?.files);
    setGradingDataState(gradingData);
  }, [gradingData]);

  if (!isUserAuthorized) {
    return (
      <h3 style={{ margin: "auto" }}>
        {"Sorry, you don't have access to view this page!"}
      </h3>
    );
  }

  const getCreateTaskModal = () => (
    <CreateTaskModal
      visible={createTaskModalVisible}
      onDismissPress={() => setCreateTaskModalVisible(false)}
      onOverlayClick={() => setCreateTaskModalVisible(false)}
      onSuccess={() => {
        setCreateTaskModalVisible(false);
        setRefreshData((prv) => prv + 1);
      }}
      projectId={projectId}
      loggedUser={loggedUser}
      usersList={projectData.members ?? []}
    />
  );

  const getGradeModal = () => (
    <>
      {isInstructor ? (
        <GradeProjectModal
          visible={gradeModalVisible}
          onDismissPress={() => setGradeModalVisible(false)}
          onOverlayClick={() => setGradeModalVisible(false)}
          onSuccess={(data) => {
            setGradeModalVisible(false);
            setGradingDataState({
              ...gradingDataState,
              grade: data.grade,
              comment: data.comment
            });
          }}
          prjSubmissionId={gradingData?.id}
        />
      ) : (
        <AddFilesModal
          visible={gradeModalVisible}
          onDismissPress={() => setGradeModalVisible(false)}
          onOverlayClick={() => setGradeModalVisible(false)}
          onSuccess={() => setGradeModalVisible(false)}
          onSubmit={async (uploadedFiles) => {
            try {
              await uploadFileForProjectSubmission(
                uploadedFiles,
                gradingData?.id
              );
              setSubmittedFiles([
                ...submittedFiles,
                ...uploadedFiles?.map((file) => ({
                  fileName: file.name,
                  fileType: file.type
                }))
              ]);
            } catch (err) {
              console.error("Failed to upload files, Error: " + err);
            }
          }}
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
          tabTitles={(() =>
            isInClass
              ? isInstructor
                ? ["Home", "Tasks", "Grading"]
                : ["Home", "Tasks", "Grading", "Suggested Users"]
              : ["Home", "Tasks", "Suggested Users"])()}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div style={styles.tabPage}>
          {selectedIndex === 0 && <ProjectHomePage projectData={projectData} />}
          {selectedIndex === 1 && (
            <TasksPage
              setCreateTaskModalVisible={setCreateTaskModalVisible}
              projectData={projectData}
              tasks={tasks}
            />
          )}
          {selectedIndex === 3 && !!isInClass && (
            <SuggestedUserPage
              projectData={projectData}
              loggedUser={loggedUser}
              classId={isInClass}
            />
          )}
          {selectedIndex === 2 && !!isInClass && (
            <GradesPage
              setGradeModalVisible={setGradeModalVisible}
              projectData={projectData}
              isInstructor={isInstructor}
              gradingData={gradingDataState}
              submittedFiles={submittedFiles}
              setSubmittedFiles={setSubmittedFiles}
            />
          )}
          {selectedIndex === 2 && !isInClass && (
            <SuggestedUserPage
              projectData={projectData}
              loggedUser={loggedUser}
              classId={isInClass}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
