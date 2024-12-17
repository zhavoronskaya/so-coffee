"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type Props = {
  delay?: number;
  trigger: string;
  el: string;
  immediateRender: boolean;
  opacity?: number;
  staggerEach?: number;
  onComplete?: () => void;
};

const ShowingBlock = ({
  delay = 2,
  trigger,
  el,
  immediateRender,
  opacity = 1,
  staggerEach = 0.3,
  onComplete = () => {},
}: Props) => {
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { immediateRender: immediateRender },
        scrollTrigger: { trigger },
        // start: "top 70%",
        // end: "center 50%",
      });

      tl.to(el, {
        duration: 0.4,
        y: 0,
        opacity: opacity,
        delay: delay,
        stagger: { each: staggerEach, grid: "auto" },
        ease: "power2.out",
        onComplete: onComplete,
      });
    },

    { dependencies: [] }
  );

  return null;
};

export default ShowingBlock;
