import React, { useState } from "react";
import { styles } from "./styles.ts";
import TabsManager from "../../Components/TabsManager/TabsManager";
import { useParams } from "react-router-dom";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import ProjectHomePage from "./ProjectHomePage";

const ProjectPage = () => {
  const { projectId } = useParams();
  const loggedUser = useAuthRedirect(true);

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      {/* Modals will go here! */}
      <div style={styles.mainContainer}>
        <TabsManager
          tabTitles={["Home", "Tasks", "Task Submissions", "Grading"]}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div style={styles.tabPage}>
          {selectedIndex === 0 && <ProjectHomePage />}
          {selectedIndex === 1 && <></>}
          {selectedIndex === 2 && <></>}
          {selectedIndex === 3 && <></>}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
