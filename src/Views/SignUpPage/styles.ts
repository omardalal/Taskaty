import { CSSProperties } from "react";
import { gray10 } from "@carbon/colors";

export const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    maxWidth: 675,
    width: "90%"
  } as CSSProperties,
  formContainer: {
    position: "static",
    width: "100%",
    padding: 16
  } as CSSProperties,
  signUpTitle: {
    fontSize: 20,
    fontWeight: 450
  } as CSSProperties,
  formDesc: {
    fontSize: "14px",
    margin: "4px 0 8px 0"
  } as CSSProperties,
  formButtonContainer: {
    backgroundColor: gray10,
    borderRadius: 10,
    minHeight: 460,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  } as CSSProperties,
  multifieldRow: (hitBreakPoint) =>
    ({
      display: "flex",
      flexDirection: hitBreakPoint ? "column" : "row",
      marginBottom: "16px"
    } as CSSProperties),
  submitBtn: {
    marginLeft: "auto",
    display: "flex",
    width: "50%",
    borderRadius: "0 0 10px 0"
  } as CSSProperties,
  fieldSeparator: {
    paddingBottom: "16px"
  } as CSSProperties,
  progressIndicator: (hitBreakPoint) =>
    ({
      marginBottom: 30,
      display: "flex",
      flexDirection: hitBreakPoint ? "column" : "row"
    } as CSSProperties),
  createNewAccountTitle: {
    marginBottom: 16
  } as CSSProperties,
  multiSelectContainer: {
    flex: 1,
    minWidth: "50%"
  } as CSSProperties,
  radioGroupContainer: {
    display: "flex",
    width: "50%",
    paddingLeft: 8,
    alignItems: "center"
  } as CSSProperties
};
