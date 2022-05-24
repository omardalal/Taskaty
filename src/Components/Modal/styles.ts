import { CSSProperties } from "react";

export const styles = {
  overlay: (visible) =>
    ({
      position: "fixed",
      zIndex: 100,
      backgroundColor: "rgba(0 0 0 / 0.8)",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: visible ? 1 : 0
    } as CSSProperties)
};
