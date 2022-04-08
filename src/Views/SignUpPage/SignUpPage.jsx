import React, { useState } from "react";
import { styles } from "./styles.ts";
import {
  TextInput,
  ProgressIndicator,
  ProgressStep,
  MultiSelect,
  Dropdown,
  RadioButtonGroup,
  RadioButton
} from "carbon-components-react";
import strings from "../../Constants/strings";
import useMediaQuery from "../../CustomHooks/useMediaQuery";
import {
  generalSkills,
  majors,
  universities,
  cities
} from "../../Constants/lookupConstants";
import InputForm from "../../Components/InputForm/inputForm";
import LoginModal from "../../Components/LoginModal/LoginModal";
import {
  addUserToFirestore,
  createUser
} from "../../Utilities/AuthenticationUtils";
import { AuthErrorCodes } from "firebase/auth";
import useAuthRedirect from "../../CustomHooks/useAuthRedirect";

const SignUpPage = () => {
  const [stepOneInputValues, setStepOneInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [stepTwoInputValues, setStepTwoInputValues] = useState({
    skills: [],
    interests: [],
    major: "",
    academicLevel: "none",
    university: "",
    work: "",
    city: ""
  });
  const [stepNumber, setStepNumber] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [signUpErrorMsg, setSignUpErrorMsg] = useState("");
  useAuthRedirect(false);

  const stepOneValid = () => {
    if (
      !!stepOneInputValues.firstName &&
      !!stepOneInputValues.lastName &&
      !!stepOneInputValues.email &&
      !!stepOneInputValues.password &&
      !!stepOneInputValues.confirmPassword &&
      stepOneInputValues.password?.length >= 6 &&
      stepOneInputValues.password === stepOneInputValues.confirmPassword
    ) {
      setShowWarning(false);
      return true;
    }
    setShowWarning(true);
    return false;
  };

  const columnRowBreakPoint = useMediaQuery("max-width: 560px");

  const getStepOneFields = () => (
    <>
      <div style={styles.multifieldRow(columnRowBreakPoint)}>
        <TextInput
          invalid={showWarning && !stepOneInputValues.firstName}
          invalidText={strings.fieldRequired}
          data-modal-primary-focus
          labelText={strings.firstName}
          placeholder={strings.firstName}
          defaultValue={stepOneInputValues.firstName ?? ""}
          onChange={(evt) => {
            setStepOneInputValues({
              ...stepOneInputValues,
              ...{ firstName: evt.target?.value }
            });
          }}
          light
          required
        />
        <div
          style={{
            ...(!columnRowBreakPoint && { marginRight: "16px" })
          }}
        />
        {columnRowBreakPoint && <div style={styles.fieldSeparator} />}
        <TextInput
          data-modal-primary-focus
          invalid={showWarning && !stepOneInputValues.lastName}
          invalidText={strings.fieldRequired}
          labelText={strings.lastName}
          placeholder={strings.lastName}
          defaultValue={stepOneInputValues.lastName ?? ""}
          onChange={(evt) => {
            setStepOneInputValues({
              ...stepOneInputValues,
              ...{ lastName: evt.target?.value }
            });
          }}
          light
          required
        />
      </div>
      <TextInput
        data-modal-primary-focus
        invalid={showWarning && !stepOneInputValues.email}
        invalidText={strings.fieldRequired}
        labelText={strings.email}
        placeholder={strings.email}
        defaultValue={stepOneInputValues.email ?? ""}
        onChange={(evt) => {
          setStepOneInputValues({
            ...stepOneInputValues,
            ...{ email: evt.target?.value }
          });
        }}
        light
        required
      />
      <div style={styles.fieldSeparator} />
      <TextInput.PasswordInput
        data-modal-primary-focus
        invalid={showWarning && !stepOneInputValues.password}
        invalidText={strings.fieldRequired}
        labelText={strings.password}
        placeholder={strings.password}
        defaultValue={stepOneInputValues.password ?? ""}
        light
        onChange={(evt) => {
          setStepOneInputValues({
            ...stepOneInputValues,
            ...{ password: evt.target?.value }
          });
        }}
        warn={
          stepOneInputValues.password.length < 6 &&
          !!stepOneInputValues.password
        }
        warnText={strings.passwordLengthWarn}
        required
      />
      <div style={styles.fieldSeparator} />
      <TextInput.PasswordInput
        data-modal-primary-focus
        invalid={showWarning && !stepOneInputValues.confirmPassword}
        invalidText={strings.fieldRequired}
        labelText={`${strings.confirm} ${strings.password}`}
        placeholder={strings.password}
        light
        defaultValue={stepOneInputValues.confirmPassword ?? ""}
        onChange={(evt) => {
          setStepOneInputValues({
            ...stepOneInputValues,
            ...{ confirmPassword: evt.target?.value }
          });
        }}
        warn={
          stepOneInputValues.password !== stepOneInputValues.confirmPassword
        }
        warnText={strings.passwordMismatchWarn}
        required
      />
    </>
  );

  const getStepTwoFields = () => (
    <>
      <div style={styles.multifieldRow(columnRowBreakPoint)}>
        <div
          style={{
            ...styles.multiSelectContainer,
            ...(!columnRowBreakPoint && { marginRight: "16px" })
          }}
        >
          <MultiSelect
            label={`${strings.select} ${strings.skills}`}
            titleText={strings.skills}
            items={generalSkills.sort()}
            itemToString={(item) => item || ""}
            selectionFeedback="top-after-reopen"
            light
            onChange={(items) => {
              setStepTwoInputValues({
                ...stepTwoInputValues,
                ...{ skills: items.selectedItems }
              });
            }}
            initialSelectedItems={stepTwoInputValues.skills ?? []}
          />
        </div>
        {columnRowBreakPoint && <div style={styles.fieldSeparator} />}
        <div
          style={{
            ...styles.multiSelectContainer,
            ...(!columnRowBreakPoint && { paddingRight: 16 })
          }}
        >
          <MultiSelect
            label={`${strings.select} ${strings.interests}`}
            titleText={strings.interests}
            items={generalSkills.sort()}
            itemToString={(item) => item || ""}
            selectionFeedback="top-after-reopen"
            onChange={(items) => {
              setStepTwoInputValues({
                ...stepTwoInputValues,
                ...{ interests: items.selectedItems }
              });
            }}
            initialSelectedItems={stepTwoInputValues.interests ?? []}
            light
          />
        </div>
      </div>
      <div style={styles.multifieldRow(columnRowBreakPoint)}>
        <div
          style={{
            ...styles.multiSelectContainer,
            ...(!columnRowBreakPoint && { marginRight: "16px" })
          }}
        >
          <Dropdown
            titleText={strings.major}
            label={`${strings.select} ${strings.major}`}
            items={majors.sort()}
            itemToString={(item) => item || ""}
            onChange={(item) => {
              setStepTwoInputValues({
                ...stepTwoInputValues,
                ...{ major: item.selectedItem }
              });
            }}
            initialSelectedItem={stepTwoInputValues.major ?? ""}
            light
          />
        </div>
        {columnRowBreakPoint && <div style={styles.fieldSeparator} />}
        <div style={styles.radioGroupContainer}>
          <RadioButtonGroup
            legendText={strings.academicLevel}
            name="academicLevel"
            valueSelected={stepTwoInputValues.academicLevel}
            onChange={(selected) => {
              setStepTwoInputValues({
                ...stepTwoInputValues,
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
      </div>
      <div style={styles.multifieldRow(columnRowBreakPoint)}>
        <div
          style={{
            ...styles.multiSelectContainer,
            ...(!columnRowBreakPoint && { marginRight: "16px" })
          }}
        >
          <Dropdown
            titleText={strings.university}
            label={`${strings.university} ${strings.name}`}
            items={universities.sort()}
            itemToString={(item) => item || ""}
            onChange={(item) => {
              setStepTwoInputValues({
                ...stepTwoInputValues,
                ...{ university: item.selectedItem }
              });
            }}
            initialSelectedItem={stepTwoInputValues.university ?? ""}
            light
          />
        </div>
        {columnRowBreakPoint && <div style={styles.fieldSeparator} />}
        <TextInput
          data-modal-primary-focus
          labelText={strings.work}
          placeholder={`${strings.company} ${strings.name}`}
          onChange={(evt) => {
            setStepTwoInputValues({
              ...stepTwoInputValues,
              ...{ work: evt.target?.value }
            });
          }}
          defaultValue={stepTwoInputValues.work ?? ""}
          light
          required
        />
      </div>

      <div style={styles.multiSelectContainer}>
        <Dropdown
          titleText={strings.city}
          label={`${strings.city} ${strings.name}`}
          items={cities.sort()}
          itemToString={(item) => item || ""}
          onChange={(item) => {
            setStepTwoInputValues({
              ...stepTwoInputValues,
              ...{ city: item.selectedItem }
            });
          }}
          initialSelectedItem={stepTwoInputValues.city ?? ""}
          light
        />
      </div>
    </>
  );

  const getProgressBar = () => (
    <ProgressIndicator
      currentIndex={stepNumber}
      style={styles.progressIndicator(columnRowBreakPoint)}
      onChange={(stepClicked) => {
        if (stepClicked === 1) {
          setStepNumber(stepOneValid() ? 1 : 0);
        } else {
          setStepNumber(stepClicked);
        }
      }}
      spaceEqually
    >
      <ProgressStep
        label={strings.newAccountStepOne}
        style={{ ...(columnRowBreakPoint && { marginBottom: "16px" }) }}
      />
      <ProgressStep label={strings.newAccountStepTwo} />
    </ProgressIndicator>
  );

  const [loginVisible, setLoginVisible] = useState(false);
  return (
    <>
      <div style={{ paddingBottom: "50px" }} />
      <div style={styles.mainContainer}>
        <h1 style={styles.createNewAccountTitle}>{strings.createNewAccount}</h1>
        {getProgressBar()}
        <InputForm
          titleText={strings.signUp}
          descriptionText={
            stepNumber === 0
              ? strings.enterAccountInfo
              : strings.enterLookupInfo
          }
          buttonText={
            stepNumber === 0 ? strings.nextStep : strings.createAccount
          }
          showAlert={signUpErrorMsg}
          alertMessage={signUpErrorMsg}
          buttonOnClick={async () => {
            if (stepNumber === 0) {
              setStepNumber(stepOneValid() ? 1 : 0);
              return;
            }
            try {
              await createUser(
                stepOneInputValues.email,
                stepOneInputValues.password
              );
              await addUserToFirestore(
                stepOneInputValues.email,
                stepOneInputValues.firstName,
                stepOneInputValues.lastName,
                stepTwoInputValues.university,
                stepTwoInputValues.work,
                stepTwoInputValues.major,
                stepTwoInputValues.academicLevel,
                "PL",
                stepTwoInputValues.city,
                stepTwoInputValues.skills,
                stepTwoInputValues.interests
              );
              setSignUpErrorMsg("");
            } catch (error) {
              if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                setSignUpErrorMsg(strings.emailExists);
                return;
              }
              if (error.code === AuthErrorCodes.INVALID_EMAIL) {
                setSignUpErrorMsg(strings.invalidEmailMsg);
                return;
              }
              setSignUpErrorMsg(strings.somethingWentWrong);
            }
          }}
          FormElement={
            stepNumber === 0 ? getStepOneFields() : getStepTwoFields()
          }
          minHeight={460}
          leftBtn={
            <p style={styles.leftLink}>
              {strings.alreadyHaveAccount}
              <span
                style={styles.loginBtn}
                onClick={() => setLoginVisible(true)}
              >
                {" " + strings.login}
              </span>
            </p>
          }
        />
      </div>
      <LoginModal
        onOverlayClick={() => setLoginVisible(false)}
        onDismissPress={() => setLoginVisible(false)}
        visible={loginVisible}
      />
      <div style={{ paddingBottom: "50px" }} />
    </>
  );
};

export default SignUpPage;
