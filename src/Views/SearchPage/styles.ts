import { CSSProperties } from "react";

export const styles = {
  mainContainer: (columnView) =>
    ({
      display: "flex",
      margin: "auto",
      padding: "65px 15px",
      justifyContent: "center",
      flexDirection: columnView ? "column" : "row"
    } as CSSProperties),
  inputElement: { width: "100%", marginBottom: 16 } as CSSProperties,
  midSeparator: (columnView) =>
    ({ margin: columnView ? "15px 0px" : "0 10px" } as CSSProperties),
  filtersBox: (columnView) =>
    ({
      minWidth: columnView ? "100%" : 375
    } as CSSProperties)
};
