import { useEffect } from "react";

const useScrollLock = () => {
  useEffect(() => {
    const el = document.scrollingElement as HTMLElement;
    if (!el) return;

    const initial = window.getComputedStyle(el).overflow;
    el.style.overflow = "hidden";
    console.log("LOCK", el.style.overflow);
    return () => {
      el.style.overflow = initial;
    };
  }, []);
};

export default useScrollLock;
