import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const useAOS = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
};
