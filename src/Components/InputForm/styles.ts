import { CSSProperties } from "react";
import { gray10, red60, green60 } from "@carbon/colors";

export const styles = {
  formButtonContainer: (minHeight: number, light: boolean) =>
    ({
      backgroundColor: light ? "white" : gray10,
      borderRadius: 10,
      minHeight: minHeight,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    } as CSSProperties),
  formContainer: {
    position: "static",
    width: "100%",
    padding: 16
  } as CSSProperties,
  title: {
    fontSize: 20,
    fontWeight: 450
  } as CSSProperties,
  formDesc: {
    fontSize: "14px",
    margin: "4px 0 8px 0"
  } as CSSProperties,
  formBtn: {
    marginLeft: "auto",
    display: "flex",
    width: "50%",
    borderRadius: "0 0 10px 0"
  } as CSSProperties,
  titleRow: {
    display: "flex",
    justifyContent: "space-between"
  } as CSSProperties,
  dismissButton: {
    cursor: "pointer",
    padding: 5,
    boxSizing: "content-box"
  } as CSSProperties,
  buttonRow: {
    display: "flex",
    alignItems: "flex-start"
  } as CSSProperties,
  errorMsg: {
    color: red60,
    marginBottom: 12
  } as CSSProperties,
  successMsg: {
    color: green60,
    marginBottom: 12
  } as CSSProperties
};
