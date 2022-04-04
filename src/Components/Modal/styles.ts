import { CSSProperties } from "react";

export const styles = {
  overlay: {
    position: "fixed",
    zIndex: 100,
    backgroundColor: "rgba(0 0 0 / 0.8)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: window.scrollY
  } as CSSProperties
};
