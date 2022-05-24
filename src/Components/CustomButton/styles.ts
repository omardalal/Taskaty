import { gray100, gray60 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  customBtnBlackBg: (disabled: boolean) =>
    ({
      color: "white",
      backgroundColor: disabled ? gray60 : gray100
    } as CSSProperties),
  customBtnWhiteBg: (disabled: boolean) =>
    ({
      backgroundColor: disabled ? gray60 : "white",
      color: gray100
    } as CSSProperties),
  customBtn: (opacity: number, inTopBar: boolean, disabled: boolean) =>
    ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      padding: "0 15px",
      borderRadius: 15,
      transition: "0.3s",
      fontWeight: 500,
      opacity: opacity,
      cursor: disabled ? "context-menu" : "pointer",
      ...(inTopBar && { margin: "9px 5px" })
    } as CSSProperties)
};
