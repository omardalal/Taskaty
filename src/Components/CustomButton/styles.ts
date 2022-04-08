import { gray100 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  customBtnBlackBg: {
    color: "white",
    backgroundColor: gray100
  } as CSSProperties,
  customBtnWhiteBg: {
    backgroundColor: "white",
    color: gray100
  } as CSSProperties,
  customBtn: (opacity: number, inTopBar: boolean) =>
    ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      padding: "0 15px",
      borderRadius: 15,
      transition: "0.3s",
      fontWeight: 500,
      cursor: "pointer",
      opacity: opacity,
      ...(inTopBar ? { margin: "9px 5px" } : {})
    } as CSSProperties)
};
