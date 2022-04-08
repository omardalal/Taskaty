import { blue60, gray10 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: gray10,
    borderRadius: 10
  } as CSSProperties,
  paginationContainer: {
    borderRadius: "0 0 10px 10px",
    overflow: "hidden"
  } as CSSProperties,
  resultsBox: {
    flex: 1,
    borderRadius: "10px 10px 0 0"
  } as CSSProperties,
  resultsTitle: {
    margin: "30px 0 0 25px"
  } as CSSProperties,
  resultItemsContainer: {
    margin: "15px 25px",
    display: "flex",
    flexWrap: "wrap",
    maxHeight: 650,
    overflowY: "scroll"
  } as CSSProperties,
  resultItem: {
    margin: "4px 6px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 14,
    width: 300,
    borderRadius: 10,
    boxShadow: "0 0 5px 0 rgba(0 0 0 / 0.25)"
  } as CSSProperties,
  resultItemSubtitle: {
    fontWeight: 300,
    fontSize: 14
  } as CSSProperties,
  resultItemText: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 14
  } as CSSProperties,
  resultItemChevronContainer: {
    marginLeft: "auto",
    padding: "40px 12px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    background: blue60,
    borderRadius: "0 10px 10px 0",
    cursor: "pointer"
  } as CSSProperties
};
