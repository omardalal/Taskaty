import { gray10, gray80, gray80Hover } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  mainContainer: (long: boolean) =>
    ({
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      borderRadius: 10,
      minWidth: 305,
      margin: long ? "0 0 15px 0" : "0 15px 15px 0",
      ...(!long && { height: 295 }),
      ...(long && { width: "100%" })
    } as CSSProperties),
  nameRow: {
    backgroundColor: gray10,
    padding: "10px 16px",
    marginBottom: 1,
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
  nameText: {
    fontSize: 18
  } as CSSProperties,
  groupTitleContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "14px 0"
  } as CSSProperties,
  groupTitleText: {
    fontSize: 22
  } as CSSProperties,
  namesContainer: (long: boolean) =>
    ({
      display: "flex",
      flexDirection: "column",
      maxHeight: long ? "100%" : 191,
      overflowY: "auto"
    } as CSSProperties),
  requestToJoinBtn: (focused: boolean) =>
    ({
      backgroundColor: focused ? gray80Hover : gray80,
      color: "white",
      fontSize: 14,
      width: 132,
      marginLeft: "auto",
      marginTop: "auto",
      padding: "10px 16px",
      borderRadius: "0 0 10px 0",
      cursor: "pointer",
      transition: "0.3s"
    } as CSSProperties),
  iconBtnContainer: {
    padding: "5px 10px",
    cursor: "pointer"
  } as CSSProperties
};
