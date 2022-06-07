import React, { useEffect, useState } from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";
import ClassGroup from "../../Components/ClassGroup/ClassGroup";
import { getSuggestions } from "../../Utilities/SuggestionsGenerator";
import InputForm from "../../Components/InputForm/InputForm";
import { Dropdown, Checkbox, NumberInput } from "carbon-components-react";

const SuggestedUserPage = ({ loggedUser, projectData }) => {
  const defaultFilterSettings = {
    mostImportantFactor: "",
    useUniversity: true,
    useMajor: true,
    useLocation: true,
    suggestionsCount: 10
  };
  const [filterSettings, setFilterSettings] = useState(defaultFilterSettings);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const getSuggestedUsers = async () => {
    return await getSuggestions(
      loggedUser?.user?.email,
      projectData?.id,
      filterSettings.suggestionsCount,
      filterSettings.mostImportantFactor,
      filterSettings.useUniversity,
      filterSettings.useMajor,
      filterSettings.useLocation
    );
  };

  useEffect(() => {
    getSuggestedUsers()
      .then((users) => {
        setSuggestedUsers(users);
      })
      .catch((err) =>
        console.error(`Failed to get smart suggestions, Error: ${err}`)
      );
  }, [loggedUser]);

  const getOptionsBox = () => (
    <>
      <Dropdown
        titleText={"Most Important Factor"}
        label={"Select Factor"}
        items={["", "Skills", "Interests", "University", "Major", "Location"]}
        itemToString={(item) => item || ""}
        onChange={(item) => {
          setFilterSettings({
            ...filterSettings,
            ...{ mostImportantFactor: item?.selectedItem?.toLowerCase() }
          });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <NumberInput
        data-modal-primary-focus
        invalidText={"Enter a valid number!"}
        min={0}
        label={"Suggestions Count"}
        placeholder={"Suggestions Count"}
        hideSteppers
        defaultValue={10}
        onChange={(evt) => {
          setFilterSettings({
            ...filterSettings,
            ...{ suggestionsCount: evt.target?.value }
          });
        }}
        light
      />
      <div style={{ marginBottom: "1rem" }} />
      <Checkbox
        defaultChecked
        labelText={"Use University"}
        id="checkbox-university"
        onChange={(checked) => {
          setFilterSettings({
            ...filterSettings,
            ...{ useUniversity: checked }
          });
        }}
      />
      <div style={{ marginBottom: "0.25rem" }} />
      <Checkbox
        defaultChecked
        labelText={"Use Major"}
        id="checkbox-major"
        onChange={(checked) => {
          setFilterSettings({
            ...filterSettings,
            ...{ useMajor: checked }
          });
        }}
      />
      <div style={{ marginBottom: "0.25rem" }} />
      <Checkbox
        defaultChecked
        labelText={"Use Location"}
        id="checkbox-location"
        onChange={(checked) => {
          setFilterSettings({
            ...filterSettings,
            ...{ useLocation: checked }
          });
        }}
      />
    </>
  );

  return (
    <div style={styles.suggestionsMainContainer}>
      <div style={styles.suggestedUserContainer}>
        <ClassGroup
          usersArray={suggestedUsers.map((user) => ({
            firstName: user.firstName,
            lastName: user.lastName
          }))}
          groupName={"Suggested Users"}
          long
        />
      </div>
      <div style={styles.suggestionsSettingsContainer}>
        <InputForm
          titleText={"Smart Suggestions Settings"}
          descriptionText={"Choose your settings!"}
          buttonText={"Update Suggestions"}
          buttonOnClick={async () => {
            getSuggestedUsers()
              .then((users) => {
                console.log(filterSettings.suggestionsCount);
                console.log(users);
                setSuggestedUsers(users);
              })
              .catch((err) =>
                console.error(`Failed to get user projects, Error: ${err}`)
              );
          }}
          FormElement={getOptionsBox()}
          minHeight={300}
          hasDismissButton={false}
          light
        />
      </div>
    </div>
  );
};

SuggestedUserPage.propTypes = {
  loggedUser: PropTypes.object,
  projectData: PropTypes.object
};

export default SuggestedUserPage;
