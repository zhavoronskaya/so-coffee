"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type Props = {
  delay?: number;
};

const ShowingCanvas = ({}: Props) => {
  const tl = gsap.timeline();
  useGSAP(
    () => {
      tl.to(".canvas-wrapper", {
        duration: 2,
        opacity: 1,
        ease: "sine.in",
      });
    },

    { dependencies: [] }
  );

  return null;
};

export default ShowingCanvas;
