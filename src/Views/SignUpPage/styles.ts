import { CSSProperties } from "react";
import { blue60 } from "@carbon/colors";

export const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    maxWidth: 675,
    width: "90%"
  } as CSSProperties,
  multifieldRow: (hitBreakPoint) =>
    ({
      display: "flex",
      flexDirection: hitBreakPoint ? "column" : "row",
      marginBottom: "16px"
    } as CSSProperties),
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
  } as CSSProperties,
  leftLink: {
    marginLeft: 16,
    paddingTop: 7.5
  } as CSSProperties,
  loginBtn: {
    color: blue60,
    cursor: "pointer"
  }
};
