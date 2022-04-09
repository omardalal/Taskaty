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
    height: 710,
    overflowY: "scroll"
  } as CSSProperties,
  resultItem: {
    margin: "4px 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 200,
    borderRadius: 10,
    paddingTop: 35,
    boxShadow: "0 0 5px 0 rgba(0 0 0 / 0.25)"
  } as CSSProperties,
  resultItemVisitBtn: {
    marginTop: "auto",
    padding: "15px 0",
    background: blue60,
    color: "white",
    width: "100%",
    borderRadius: "0 0 10px 10px",
    fontWeight: 500,
    cursor: "pointer"
  } as CSSProperties,
  resultItemSubtitle: {
    fontWeight: 300,
    fontSize: 14
  } as CSSProperties,
  resultItemText: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    alignItems: "center"
  } as CSSProperties,
  resultItemTitle: {
    maxWidth: 185,
    textOverflow: "ellipsis",
    lineHeight: 1.4,
    maxHeight: "1.4em",
    overflow: "hidden"
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
  resultItemIcon: { width: 64, height: 64 } as CSSProperties
};
