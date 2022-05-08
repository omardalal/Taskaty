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
  groupsContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 4,
    height: "fit-content"
  } as CSSProperties
};
