import { gray10 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "48px 0",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: gray10
  } as CSSProperties,
  tabPage: {
    display: "flex",
    height: "100%"
  } as CSSProperties,
  tabPageMainContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "28px 18px",
    width: "100%"
  } as CSSProperties,
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  } as CSSProperties,
  pageTitle: { fontSize: 36 } as CSSProperties,
  titleRightBtnContainer: {
    display: "flex",
    height: "100%"
  } as CSSProperties,
  homeMainContainer: {
    width: "100%",
    display: "flex",
    paddingTop: 15
  } as CSSProperties,
  boxContainer: {
    borderRadius: 10,
    padding: "28px 18px",
    backgroundColor: "white",
    margin: "5px 15px",
    flex: 1
  } as CSSProperties,
  homeInfoTopRow: {
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
  homeInfoCol: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  } as CSSProperties,
  homeHeader2Light: { fontSize: 20 } as CSSProperties,
  homeHeader2: { fontSize: 20, fontWeight: "500" },
  projectHomePageTitleRow: {
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
  projectDescTitle: {
    fontSize: 32,
    fontWeight: "500",
    marginBottom: 16
  } as CSSProperties,
  projectDescriptionTitle: { marginTop: 25, marginBottom: 6 } as CSSProperties,
  projectDescriptionBody: { fontSize: 14.75 } as CSSProperties,
  homeRightContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  } as CSSProperties,
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: 200,
    overflow: "auto"
  } as CSSProperties,
  tagsTitle: { marginBottom: 10 } as CSSProperties
};
