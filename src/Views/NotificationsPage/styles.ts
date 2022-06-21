/* eslint-disable indent */
import { CSSProperties } from "react";
import { gray10, green50, red50, yellow30 } from "@carbon/colors";
import { NotificationStatus } from "./NotificationsPage";

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
    flexWrap: "wrap",
    flex: 1
  } as CSSProperties,
  notification: {
    backgroundColor: "white",
    padding: "10px 15px",
    borderRadius: 10,
    display: "flex",
    margin: "10px 0",
    minWidth: 300,
    minHeight: 100,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 0 3px 0 rgba(0 0 0 / 0.25)"
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
  requestIcon: (status: string, pressable: boolean) =>
    ({
      margin: "auto 5",
      color:
        status === NotificationStatus.Accepted
          ? green50
          : status === NotificationStatus.Rejected
          ? red50
          : yellow30,
      minWidth: 15,
      minHeight: 15,
      ...(pressable && { cursor: "pointer" })
    } as CSSProperties),
  notifBox: {
    display: "flex",
    flexDirection: "column",
    minWidth: 350,
    padding: 15,
    borderRadius: 10,
    minHeight: 100,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: gray10,
    flex: 1
  } as CSSProperties,
  notifBoxTitle: { fontSize: 22, marginBottom: 10 } as CSSProperties
};
