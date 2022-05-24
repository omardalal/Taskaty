import { blue60, gray10 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: gray10,
    borderRadius: 10,
    minHeight: 850,
    flex: 1
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
    overflowY: "scroll"
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
  } as CSSProperties,
  titleBar: {
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
  rightButtonsContainer: {
    borderRadius: "0 10px 0 0",
    overflow: "hidden"
  } as CSSProperties
};
