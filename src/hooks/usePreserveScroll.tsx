import { useEffect } from "react";

export const usePreserveScroll = (key: any) => {
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem(key);

    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }

    const handleScroll = () => {
      sessionStorage.setItem(key, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [key]);
};
