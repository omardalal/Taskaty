import React, { useEffect, useState } from "react";
import { styles } from "./styles.ts";
import { ResultIconTypes } from "../../Components/ResultItem/ResultItem";
import ResultsContainer from "../../Components/ResultsContainer/ResultsContainer";
import strings from "../../Constants/strings";
import { Button } from "carbon-components-react";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import CreateProjectModal from "../../Components/ProjectModals/CreateProjectModal";
import { getProjectByID, getUserProjects } from "../../Utilities/ProjectUtils";

const ProjectsPage = () => {
  const [resultsData, setResultsData] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const [createProjectModalVisible, setCreateProjectModalVisible] =
    useState(false);

  const loggedUser = useAuthRedirect(true);

  useEffect(() => {
    const getProjects = async () => {
      const projectIds = await getUserProjects(loggedUser.user?.email);
      const projects = await Promise.all(
        projectIds.map(async (prjId) => {
          const prj = await getProjectByID(prjId);
          return { ...prj, ...{ id: prjId } };
        })
      );
      return projects;
    };

    getProjects()
      .then((projects) => {
        const resultsData = projects?.map((prj) => ({
          title: prj.name,
          subtitle: prj.subject,
          extraInfo: prj.type,
          buttonText: strings.visitProject,
          visitURL: `/project/${prj.id}`
        }));
        setResultsData(resultsData);
      })
      .catch((err) =>
        console.error(`Failed to get user projects, Error: ${err}`)
      );
  }, [loggedUser, refreshData]);

  const getRightButtons = () => (
    <>
      <Button onClick={() => setCreateProjectModalVisible(true)}>
        {strings.createNewProject}
      </Button>
    </>
  );

  const getCreateProjectModal = () => (
    <CreateProjectModal
      visible={createProjectModalVisible}
      onDismissPress={() => setCreateProjectModalVisible(false)}
      onOverlayClick={() => setCreateProjectModalVisible(false)}
      onSuccess={() => {
        setCreateProjectModalVisible(false);
        setRefreshData((prv) => prv + 1);
      }}
      loggedUser={loggedUser}
    />
  );

  return (
    <>
      {getCreateProjectModal()}
      <div style={styles.classesContainer}>
        <ResultsContainer
          resultsTitle={strings.myProjects}
          resultIconType={ResultIconTypes.Project}
          results={resultsData}
          rightButtons={getRightButtons()}
        />
      </div>
    </>
  );
};

export default ProjectsPage;
