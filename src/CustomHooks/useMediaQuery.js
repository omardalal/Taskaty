import { useState, useEffect } from "react";
const useMediaQuery = (mediaQuery) => {
  const mediaMatch = window.matchMedia(`(${mediaQuery})`);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  return matches;
};

export default useMediaQuery;
