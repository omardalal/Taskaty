import React, { useState } from "react";
import { styles } from "./styles.ts";
import ResultsContainer from "../../Components/ResultsContainer/ResultsContainer";
import { ResultIconTypes } from "../../Components/ResultItem/ResultItem";
import strings from "../../Constants/strings";
import { Button } from "carbon-components-react";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import CreateClassModal from "../../Components/ClassModals/CreateClassModal";
import JoinClassModal from "../../Components/ClassModals/JoinClassModal";

const ClassesPage = () => {
  useAuthRedirect(true);

  const [createClassModalVisible, setCreateClassModalVisible] = useState(false);
  const [joinClassModalVisible, setJoinClassModalVisible] = useState(false);
  const getRandomResults = () => {
    const results = [];
    for (let i = 1; i <= 15; i++) {
      const title = "Course #" + i;
      const subtitle = "COMP00" + i < 10 ? `0${i}` : i;
      const extraInfo = "Section #" + Math.floor(Math.random() * 5);
      const visitURL = "/class/123";
      results.push({
        title: title,
        subtitle: subtitle,
        extraInfo: extraInfo,
        buttonText: strings.visitClass,
        visitURL: visitURL
      });
    }
    return results;
  };

  const getRightButtons = () => (
    <>
      <Button
        kind="secondary"
        onClick={() => {
          setJoinClassModalVisible(true);
        }}
      >
        {strings.joinClass}
      </Button>
      <Button
        onClick={() => {
          setCreateClassModalVisible(true);
        }}
      >
        {strings.createNewClass}
      </Button>
    </>
  );

  return (
    <>
      <CreateClassModal
        onOverlayClick={() => setCreateClassModalVisible(false)}
        onDismissPress={() => setCreateClassModalVisible(false)}
        onLoginSucceed={() => setCreateClassModalVisible(false)}
        visible={createClassModalVisible}
      />
      <JoinClassModal
        onOverlayClick={() => setJoinClassModalVisible(false)}
        onDismissPress={() => setJoinClassModalVisible(false)}
        onLoginSucceed={() => setJoinClassModalVisible(false)}
        visible={joinClassModalVisible}
      />
      <div style={styles.classesContainer}>
        <ResultsContainer
          resultsTitle={strings.myClasses}
          resultIconType={ResultIconTypes.Class}
          results={getRandomResults()}
          rightButtons={getRightButtons()}
        />
      </div>
    </>
  );
};

export default ClassesPage;
