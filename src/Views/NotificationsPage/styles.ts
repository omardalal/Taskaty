import { CSSProperties } from "react";
import { gray10, green50, red50 } from "@carbon/colors";

export const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "70px 18px",
    width: "100%"
  } as CSSProperties,
  pageTitle: { fontSize: 36, marginBottom: 15 } as CSSProperties,
  notificationsContainer: {
    display: "flex",
    flexWrap: "wrap"
  } as CSSProperties,
  notification: {
    backgroundColor: gray10,
    padding: "10px 15px",
    borderRadius: 10,
    display: "flex",
    margin: "10px 5px",
    width: 450,
    minHeight: 100,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  } as CSSProperties,
  notificationBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 25px",
    flex: 1
  } as CSSProperties,
  leftIcon: { margin: "auto 0 auto 15px" } as CSSProperties,
  requestNotiBtns: {
    display: "flex",
    justifyContent: "space-between",
    overflow: "clip"
  } as CSSProperties,
  requestIcon: (accept: boolean) =>
    ({
      margin: "auto 5",
      color: accept ? green50 : red50,
      minWidth: 15,
      minHeight: 15,
      cursor: "pointer"
    } as CSSProperties)
};
