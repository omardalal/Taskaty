import { CSSProperties } from "react";
import { gray10, gray20 } from "@carbon/colors";

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
  pageTitle: { fontSize: 36 } as CSSProperties,
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  } as CSSProperties,
  titleRightBtnContainer: {
    display: "flex",
    height: "100%"
  } as CSSProperties,
  boxContainer: {
    borderRadius: 10,
    padding: "28px 18px",
    backgroundColor: "white",
    margin: 15
  } as CSSProperties,
  courseDescTitle: {
    fontSize: 32,
    fontWeight: "500",
    marginBottom: 16
  } as CSSProperties,
  homeHeader2Light: { fontSize: 20 } as CSSProperties,
  homeHeader2: { fontSize: 20, fontWeight: "500" },
  courseDescriptionTitle: { marginTop: 25, marginBottom: 6 } as CSSProperties,
  courseDescriptionBody: { fontSize: 14.75 } as CSSProperties,
  homeInfoTopRow: {
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
  homeInfoCol: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  } as CSSProperties,
  membersTitle: { marginTop: 20, marginBottom: 5 } as CSSProperties,
  sectionHomePageTitleRow: {
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
  tabPageMainContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "28px 18px",
    width: "100%"
  } as CSSProperties,
  announcementContainer: {
    borderRadius: 10,
    padding: "20px 15px",
    backgroundColor: "white",
    marginBottom: 15
  } as CSSProperties,
  announcementTitle: {
    fontSize: 26,
    fontWeight: "500"
  } as CSSProperties,
  announcementInstructorName: {
    fontSize: 18,
    fontWeight: "400"
  } as CSSProperties,
  announcementH5: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 7.5
  } as CSSProperties,
  descH5: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 15
  } as CSSProperties,
  announcementAttachments: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap"
  } as CSSProperties,
  membersContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: 200,
    overflow: "auto"
  } as CSSProperties,
  groupsPageBodyContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  } as CSSProperties,
  groupsContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 4,
    height: "fit-content"
  } as CSSProperties,
  availableListContainer: {
    display: "flex",
    flex: 1
  } as CSSProperties,
  homeMainContainer: {
    width: "100%"
  } as CSSProperties,
  joinCode: {
    backgroundColor: gray20,
    padding: "0 10px",
    margin: "10px 0 5px 0",
    width: "fit-content"
  } as CSSProperties,
  joinHint: {
    opacity: 0.75,
    fontSize: 14
  } as CSSProperties
};
