import React from "react";
import { styles } from "./styles.ts";
import ResultsContainer, {
  ResultIconTypes
} from "../../Components/ResultsContainer/ResultsContainer";
import strings from "../../Constants/strings";
import { Button } from "carbon-components-react";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";

const ClassesPage = () => {
  const getRandomResults = () => {
    const results = [];
    for (let i = 1; i <= 15; i++) {
      const title = "Course #" + i;
      const subtitle = "COMP00" + i < 10 ? `0${i}` : i;
      const extraInfo = "Section #" + Math.floor(Math.random() * 5);
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
      <Button kind="secondary">{strings.joinClass}</Button>
      <Button>{strings.createNewClass}</Button>
    </>
  );

  return (
    <div style={styles.classesContainer}>
      <ResultsContainer
        resultsTitle={strings.myClasses}
        resultIconType={ResultIconTypes.Class}
        results={getRandomResults()}
        rightButtons={getRightButtons()}
      />
    </div>
  );
};

export default ClassesPage;