import React from "react";
import { styles } from "./styles.ts";
import { ResultIconTypes } from "../../Components/ResultItem/ResultItem";
import ResultsContainer from "../../Components/ResultsContainer/ResultsContainer";
import strings from "../../Constants/strings";
import { Button } from "carbon-components-react";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";

const ProjectsPage = () => {
  const getRandomResults = () => {
    const results = [];
    for (let i = 1; i <= 15; i++) {
      const title = "Project #" + i;
      const subtitle = "Subject";
      const extraInfo = "Type";
      results.push({
        title: title,
        subtitle: subtitle,
        extraInfo: extraInfo,
        buttonText: strings.visitClass
      });
    }
    return results;
  };

  useAuthRedirect(true);

  const getRightButtons = () => (
    <>
      <Button>{strings.createNewProject}</Button>
    </>
  );

  return (
    <div style={styles.classesContainer}>
      <ResultsContainer
        resultsTitle={strings.myProjects}
        resultIconType={ResultIconTypes.Project}
        results={getRandomResults()}
        rightButtons={getRightButtons()}
      />
    </div>
  );
};

export default ProjectsPage;
