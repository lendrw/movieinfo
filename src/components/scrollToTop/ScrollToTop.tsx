import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPageToTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.getElementById("root")?.scrollTo(0, 0);
};

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    scrollPageToTop();

    const animationFrame = window.requestAnimationFrame(scrollPageToTop);
    const timeout = window.setTimeout(scrollPageToTop, 0);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeout);
    };
  }, [pathname, search]);

  return null;
};
