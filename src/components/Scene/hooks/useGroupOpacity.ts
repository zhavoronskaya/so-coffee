import { Group, Mesh } from "three";
import { MutableRefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { isMaterial } from "../helpers/Material";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function useGroupOpacity(
  group: MutableRefObject<Group | null>,
  triger: string,
  ignore?: boolean
) {
  useGSAP(
    () => {
      if (!group.current) {
        return;
      }

      const tl = gsap.timeline();

      group.current.children.forEach((child) => {
        const material = (child as Mesh).material;
        if (isMaterial(material)) {
          tl.to(material, {
            opacity: 0,
            scrollTrigger: {
              trigger: triger,
              start: "top bottom",
              end: "top 30%",
              scrub: 0.5,
            },

            onUpdate: () => {
              material.needsUpdate = true;
            },
          });
        }
      });
    },
    { dependencies: [ignore] }
  );
}
