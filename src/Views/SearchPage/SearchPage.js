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
import {
  generalSkills,
  majors,
  universities,
  cities
} from "../../Constants/lookupConstants";
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
          <RadioButton labelText={strings.graduate} value="graduate" />
          <RadioButton
            labelText={strings.undergraduate}
            value="undergraduate"
          />
          <RadioButton labelText={strings.none} value="none" />
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
        <Dropdown
          titleText={strings.university}
          label={`${strings.select} ${strings.university}`}
          items={universities.sort()}
          itemToString={(item) => item || ""}
          onChange={(item) => {
            setFiltersValues({
              ...filtersValues,
              ...{ university: item.selectedItem }
            });
          }}
          light
        />
      </div>

      <div style={styles.inputElement}>
        <Dropdown
          titleText={strings.city}
          label={`${strings.select} ${strings.city}`}
          items={cities.sort()}
          itemToString={(item) => item || ""}
          onChange={(item) => {
            setFiltersValues({
              ...filtersValues,
              ...{ city: item.selectedItem }
            });
          }}
          light
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
    </>
  );

  const getRandomResults = () => {
    const names = [
      "Oliver Jack",
      "Liam John",
      "Harry Callum",
      "Jacob Reece",
      "Michael Richards",
      "Oscar Rhys",
      "James Damain",
      "William Thomas"
    ];
    const results = [];
    for (let i = 0; i < 75; i++) {
      const title = names[Math.floor(Math.random() * names.length)];
      const subtitle =
        universities[Math.floor(Math.random() * universities.length)];
      const extraInfo = cities[Math.floor(Math.random() * cities.length)];
      results.push({ title: title, subtitle: subtitle, extraInfo: extraInfo });
    }
    return results;
  };

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
        results={getRandomResults()} // Replace with real results
        resultIconType={ResultIconTypes.User}
      />
      <div style={styles.midSeparator(columnView)} />
    </div>
  );
};

export default SearchPage;
