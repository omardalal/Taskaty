import React, { useState } from "react";
import { styles } from "./styles.ts";
import ResultsContainer from "../../Components/ResultsContainer/ResultsContainer";
import { ResultIconTypes } from "../../Components/ResultItem/ResultItem";
import strings from "../../Constants/strings";
import { Button } from "carbon-components-react";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";
import CreateClassModal from "../../Components/ClassModals/CreateClassModal";
import JoinClassModal from "../../Components/ClassModals/JoinClassModal";
import { useFetchClasses } from "../../CustomHooks/useFetchClasses";

const ClassesPage = () => {
  const loggedUser = useAuthRedirect(true);

  const [createClassModalVisible, setCreateClassModalVisible] = useState(false);
  const [joinClassModalVisible, setJoinClassModalVisible] = useState(false);
  const [refreshFetch, setRefreshFetch] = useState(0);
  const userClasses = useFetchClasses(undefined, refreshFetch);

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
        onSuccess={() => {
          setCreateClassModalVisible(false);
          setRefreshFetch((prev) => prev + 1);
        }}
        visible={createClassModalVisible}
        loggedUser={loggedUser}
      />
      <JoinClassModal
        onOverlayClick={() => setJoinClassModalVisible(false)}
        onDismissPress={() => setJoinClassModalVisible(false)}
        onSuccess={() => {
          setJoinClassModalVisible(false);
          setRefreshFetch((prev) => prev + 1);
        }}
        visible={joinClassModalVisible}
        loggedUser={loggedUser}
      />
      <div style={styles.classesContainer}>
        <ResultsContainer
          resultsTitle={strings.myClasses}
          resultIconType={ResultIconTypes.Class}
          results={userClasses}
          rightButtons={getRightButtons()}
        />
      </div>
    </>
  );
};

export default ClassesPage;
