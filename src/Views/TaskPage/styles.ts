import { blue60, gray10, green40, red50, yellow30 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 65,
    backgroundColor: gray10,
    minHeight: "100vh"
  } as CSSProperties,
  saveBtnContainer: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: 40,
    margin: "0 10px"
  } as CSSProperties,
  boxContainer: {
    borderRadius: 10,
    padding: "15px 15px",
    backgroundColor: "white",
    margin: "5px 10px",
    flex: 1
  } as CSSProperties,
  taskInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 7.5,
    alignItems: "center"
  } as CSSProperties,
  header2Light: { fontSize: 16 } as CSSProperties,
  header2: { fontSize: 16, fontWeight: "500" },
  taskDescriptionBody: { fontSize: 14.75 } as CSSProperties,
  rowContainer: {
    display: "flex",
    paddingTop: 5,
    flexWrap: "wrap"
  } as CSSProperties,
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  } as CSSProperties,
  rightContainer: {
    display: "flex",
    flex: 1,
    minWidth: 500
  } as CSSProperties,
  dropdown: { minWidth: "40%" } as CSSProperties,
  taskName: { maxWidth: "60%", minWidth: 250 } as CSSProperties,
  attachmentsRow: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 5
  } as CSSProperties,
  boxTitle: {
    fontSize: 22,
    fontWeight: 450,
    marginBottom: 10
  } as CSSProperties,
  submissionBox: {
    backgroundColor: gray10,
    boxShadow: "0 0 3px 0 rgb(0 0 0 / 25%)",
    margin: "10px 0",
    position: "relative"
  } as CSSProperties,
  submissionStatusRow: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  } as CSSProperties,
  submissionStatusIcon: (checkMark: boolean) =>
    ({
      color: checkMark ? blue60 : yellow30,
      marginRight: 5
    } as CSSProperties),
  submissionVersionTag: (checkMark: boolean) =>
    ({
      backgroundColor: checkMark ? green40 : red50,
      color: "white",
      position: "absolute",
      top: 0,
      left: 0,
      padding: "4px 15px",
      borderRadius: "10px 0 10px 0"
    } as CSSProperties),
  submissionBottomRow: { display: "flex" } as CSSProperties,
  submittedByContainer: { margin: "10px 0" } as CSSProperties,
  submissionDateContainer: { marginTop: "auto" } as CSSProperties,
  goToSubmissionBtn: {
    minHeight: 35,
    display: "flex",
    marginLeft: 10
  } as CSSProperties,
  titleBtnContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 5
  } as CSSProperties
};
