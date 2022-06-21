import { CSSProperties } from "react";
import { blue50, red50, gray10, blue50Hover, red50Hover } from "@carbon/colors";

export const styles = {
  container: (light: boolean) =>
    ({
      display: "flex",
      flex: 1,
      marginBottom: 5,
      backgroundColor: light ? "white" : gray10,
      borderRadius: 10,
      maxHeight: 100
    } as CSSProperties),
  infoContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  } as CSSProperties,
  fileName: {
    lineHeight: 1.2,
    fontSize: 16,
    wordBreak: "break-all",
    overflow: "hidden"
  } as CSSProperties,
  fileType: {
    lineHeight: 1.2,
    fontSize: 14
  } as CSSProperties,
  downloadButton: (focused: boolean) =>
    ({
      backgroundColor: focused ? blue50Hover : blue50,
      borderRadius: "0 10px 10px 0",
      transition: "0.3s"
    } as CSSProperties),
  deleteButton: (focused: boolean, showDownloadBtn: boolean) =>
    ({
      backgroundColor: focused ? red50Hover : red50,
      ...(!showDownloadBtn && { borderRadius: "0 10px 10px 0" }),
      transition: "0.3s"
    } as CSSProperties),
  attachmentButton: {
    padding: "0 25px",
    cursor: "pointer",
    color: "white",
    display: "flex",
    alignItems: "center"
  } as CSSProperties,
  icon: {
    margin: "10px 7.5px 10px 15px"
  } as CSSProperties
};
