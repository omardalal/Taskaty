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
    minWidth: 500,
    flexDirection: "column"
  } as CSSProperties,
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
  titleBtnContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 5,
    height: 30
  } as CSSProperties,
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: 200,
    overflow: "auto",
    margin: "5px 0 15px 0"
  } as CSSProperties,
  commentBox: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 7.5px",
    boxShadow: "0 0 3px 0 rgba(0 0 0 / 25%)",
    borderRadius: 10,
    backgroundColor: gray10,
    marginTop: 10
  } as CSSProperties,
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 5
  } as CSSProperties,
  commentBody: {
    maxHeight: 125,
    overflow: "auto",
    marginTop: 5
  } as CSSProperties
};
