import React, { useState } from "react";
import { styles } from "./styles.ts";
import InputForm from "../../Components/InputForm/InputForm";
import strings from "../../Constants/strings";
import {
  TextInput,
  RadioButtonGroup,
  RadioButton,
  MultiSelect,
  Dropdown
} from "carbon-components-react";
import { generalSkills, majors } from "../../Constants/lookupConstants";
import ResultsContainer, {
  ResultIconTypes
} from "../../Components/ResultsContainer/ResultsContainer";
import useMediaQuery from "../../CustomHooks/useMediaQuery";

const SearchPage = () => {
  const [filtersValues, setFiltersValues] = useState({
    name: "",
    academicLevel: "",
    skills: [],
    interests: [],
    major: "",
    university: "",
    work: "",
    city: ""
  });

  const columnView = useMediaQuery("max-width: 950px");

  const getFiltersForm = () => (
    <>
      <div style={styles.inputElement}>
        <TextInput
          data-modal-primary-focus
          labelText={strings.name}
          placeholder={strings.name}
          onChange={(evt) => {
            setFiltersValues({
              ...filtersValues,
              ...{ name: evt.target?.value }
            });
          }}
          light
          required
        />
      </div>

      <div style={styles.inputElement}>
        <RadioButtonGroup
          legendText={strings.academicLevel}
          name="academicLevel"
          valueSelected={""}
          onChange={(selected) => {
            setFiltersValues({
              ...filtersValues,
              ...{ academicLevel: selected }
            });
          }}
        >
          <div style={styles.radioButtonsContainer}>
            <RadioButton labelText={strings.graduate} value="graduate" />
            <RadioButton
              labelText={strings.undergraduate}
              value="undergraduate"
            />
            <RadioButton labelText={strings.none} value="none" />
          </div>
        </RadioButtonGroup>
      </div>

      <div style={styles.inputElement}>
        <MultiSelect
          label={`${strings.select} ${strings.skills}`}
          titleText={strings.skills}
          items={generalSkills.sort()}
          itemToString={(item) => item || ""}
          selectionFeedback="top-after-reopen"
          light
          onChange={(items) => {
            setFiltersValues({
              ...filtersValues,
              ...{ skills: items.selectedItems }
            });
          }}
        />
      </div>

      <div style={styles.inputElement}>
        <MultiSelect
          label={`${strings.select} ${strings.interests}`}
          titleText={strings.interests}
          items={generalSkills.sort()}
          itemToString={(item) => item || ""}
          selectionFeedback="top-after-reopen"
          light
          onChange={(items) => {
            setFiltersValues({
              ...filtersValues,
              ...{ interests: items.selectedItems }
            });
          }}
        />
      </div>

      <div style={styles.inputElement}>
        <Dropdown
          titleText={strings.major}
          label={`${strings.select} ${strings.major}`}
          items={majors.sort()}
          itemToString={(item) => item || ""}
          onChange={(item) => {
            setFiltersValues({
              ...filtersValues,
              ...{ major: item.selectedItem }
            });
          }}
          light
        />
      </div>

      <div style={styles.inputElement}>
        <TextInput
          data-modal-primary-focus
          labelText={strings.university}
          placeholder={strings.university}
          onChange={(evt) => {
            setFiltersValues({
              ...filtersValues,
              ...{ university: evt.target?.value }
            });
          }}
          light
          required
        />
      </div>

      <div style={styles.inputElement}>
        <TextInput
          data-modal-primary-focus
          labelText={strings.work}
          placeholder={strings.work}
          onChange={(evt) => {
            setFiltersValues({
              ...filtersValues,
              ...{ work: evt.target?.value }
            });
          }}
          light
          required
        />
      </div>

      <div style={styles.inputElement}>
        <TextInput
          data-modal-primary-focus
          labelText={strings.city}
          placeholder={strings.city}
          onChange={(evt) => {
            setFiltersValues({
              ...filtersValues,
              ...{ city: evt.target?.value }
            });
          }}
          light
          required
        />
      </div>
    </>
  );

  return (
    <div style={styles.mainContainer(columnView)}>
      <div style={styles.midSeparator(columnView)} />
      <div style={styles.filtersBox(columnView)}>
        <InputForm
          titleText={strings.filters}
          descriptionText={strings.filtersDesc}
          buttonText={strings.search}
          minHeight={700}
          FormElement={getFiltersForm()}
        />
      </div>
      <div style={styles.midSeparator(columnView)} />
      <ResultsContainer
        resultsTitle={strings.results}
        results={[]} // Replace with results array
        resultIconType={ResultIconTypes.User}
      />
      <div style={styles.midSeparator(columnView)} />
    </div>
  );
};

export default SearchPage;
