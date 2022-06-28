import { gray10 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  boxContainer: {
    borderRadius: 10,
    padding: "28px 18px",
    backgroundColor: "white",
    margin: "5px 15px",
    height: "fit-content",
    flex: 1
  } as CSSProperties,
  projectDescTitle: {
    fontSize: 32,
    fontWeight: "500",
    marginBottom: 16
  } as CSSProperties,
  homeHeader2Light: { fontSize: 20 } as CSSProperties,
  homeHeader2: { fontSize: 20, fontWeight: "500" },
  projectDescriptionTitle: { marginTop: 5 } as CSSProperties,
  projectDescriptionBody: { fontSize: 16.75 } as CSSProperties,
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: 200,
    overflow: "auto"
  } as CSSProperties,
  tagsTitle: { marginBottom: 10 } as CSSProperties,
  homeMainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 75,
    backgroundColor: gray10,
    height: "100%",
    flex: 1
  } as CSSProperties,
  homeRightContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  } as CSSProperties,
  infoRow: {
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
  prjBox: {
    display: "flex",
    width: 250,
    justifyContent: "space-between",
    margin: "3px 10px 3px 0",
    padding: "7.5px 10px",
    backgroundColor: gray10,
    borderRadius: 10,
    boxShadow: "0 0 4px 0 rgba(0 0 0 / 0.25)"
  } as CSSProperties
};
