import { CSSProperties } from "react";
import { gray20, gray40, gray70, gray100, blue60 } from "@carbon/colors";

export const styles = {
  mainContainer: {
    display: "flex",
    width: "100%"
  } as CSSProperties,
  tab: (selected: boolean) =>
    ({
      flex: 1,
      transition: "0.3s",
      cursor: "pointer",
      padding: 16,
      backgroundColor: selected ? "white" : gray20,
      borderRight: `1px solid ${gray40}`,
      ...(selected && { borderTop: `2px solid ${blue60}` })
    } as CSSProperties),
  tabTitle: (selected: boolean) =>
    ({
      fontSize: 14,
      color: selected ? gray100 : gray70,
      ...(selected && { fontWeight: "500" })
    } as CSSProperties)
};
