import { CSSProperties } from "react";
import { blue60, blue60Hover, gray60 } from "@carbon/colors";

export const styles = {
  resultItemIcon: {
    width: 64,
    height: 64
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
    height: 200,
    boxShadow: "0 0 5px 0 rgba(0 0 0 / 0.25)",
    boxSizing: "content-box"
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
  resultItemSubtitle: {
    fontWeight: 300,
    fontSize: 14
  } as CSSProperties,
  resultItemVisitBtn: (focused: boolean, btnDisabled: boolean) =>
    ({
      marginTop: "auto",
      color: "white",
      width: "100%",
      borderRadius: "0 0 10px 10px",
      fontWeight: 500,
      transition: "0.3s",
      ...(!btnDisabled && {
        backgroundColor: focused ? blue60Hover : blue60,
        cursor: "pointer"
      }),
      ...(btnDisabled && { backgroundColor: gray60, cursor: "default" })
    } as CSSProperties),
  btnLink: {
    color: "white",
    padding: "15px 0",
    height: "100%",
    display: "flex",
    justifyContent: "center"
  } as CSSProperties
};
