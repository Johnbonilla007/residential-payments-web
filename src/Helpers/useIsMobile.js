import { useEffect, useState } from "react";

export const MOBILE_MEDIA = "(max-width: 767px)";

const getInitialMatch = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(MOBILE_MEDIA).matches;
};

/**
 * Tracks whether the viewport matches the mobile breakpoint (<= 767px).
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getInitialMatch);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_MEDIA);
    const updateMatch = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMatch);
      return () => mediaQuery.removeEventListener("change", updateMatch);
    }

    mediaQuery.addListener(updateMatch);
    return () => mediaQuery.removeListener(updateMatch);
  }, []);

  return isMobile;
};

export default useIsMobile;
