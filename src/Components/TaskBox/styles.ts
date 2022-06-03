import { CSSProperties } from "react";

export const styles = {
  taskBox: (hovered: boolean) =>
    ({
      backgroundColor: "white",
      borderRadius: 10,
      overflow: "hidden",
      display: "flex",
      margin: "5px 10px",
      padding: "7.5px",
      cursor: "pointer",
      transition: "0.3s",
      height: 100,
      ...(hovered && { boxShadow: "0 0 7.5px 0 rgb(0 0 0 / 25%)" }),
      justifyContent: "space-between"
    } as CSSProperties),
  taskBoxCol: {
    display: "flex",
    flexDirection: "column"
  } as CSSProperties,
  taskBoxTaskNumber: {
    fontSize: 14
  } as CSSProperties,
  taskBoxTaskName: {
    fontSize: 18
  } as CSSProperties,
  taskBoxTaskUser: {
    fontSize: 16,
    marginTop: "auto"
  } as CSSProperties,
  taskBoxStatusContainer: {
    display: "flex",
    alignItems: "center"
  } as CSSProperties,
  taskBoxTasStatusIcon: {
    marginRight: 4
  } as CSSProperties,
  taskBoxTasStatusText: {} as CSSProperties,
  taskBoxTaskDate: {
    marginTop: "auto"
  } as CSSProperties
};
