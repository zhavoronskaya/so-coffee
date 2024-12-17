"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CoffeeId } from "@/types";
import { COFFEE_DATA } from "./CoffeePackData";
import useTranslations from "@/hooks/useTranslations";
import useApp from "@/hooks/useApp";

gsap.registerPlugin(useGSAP);

type Props = {
  coffeeId: CoffeeId;
  onDeselectAnimationComplete: () => void;
};

const CoffeeInfo = ({ coffeeId, onDeselectAnimationComplete }: Props) => {
  const { t } = useTranslations();
  const app = useApp({ watch: ["selectedCoffee"] });
  const coffee = coffeeId && COFFEE_DATA[coffeeId];
  const selectedCoffee = app.state.selectedCoffee;

  useGSAP(
    () => {
      selectedCoffee ? onCoffeeShow() : onCoffeeHide();
    },

    { dependencies: [selectedCoffee] }
  );

  const onCoffeeShow = () => {
    const el = document.querySelector("main");

    const tl = gsap.timeline({
      defaults: { immediateRender: false },
    });
    // const canvas = document.querySelector(".canvas-wrapper") as HTMLElement;
    // canvas.style.overflow = "hidden";
    // canvas.style.pointerEvents = "none";
    tl.to(el, {
      duration: 0.3,
      opacity: 0,
      ease: "power2.in",
    }).to(
      ".modal",
      {
        duration: 0.2,
        opacity: 1,
        delay: 0.2,
        y: 0,
        stagger: { each: 0.1, grid: "auto" },
        ease: "power2.out",
      },
      "<"
    );
  };

  const onCoffeeHide = () => {
    const el = document.querySelector("main");
    // const canvas = document.querySelector(".canvas-wrapper") as HTMLElement;
    // canvas.style.overflow = "auto";
    // canvas.style.pointerEvents = "auto";
    const tl = gsap.timeline({
      defaults: { immediateRender: false },
    });
    tl.to(".modal", {
      duration: 0.1,
      opacity: 0,
      y: 10,
      stagger: { each: 0.1, grid: "auto" },
      ease: "power2.in",
    }).to(
      el,
      {
        duration: 0.6,
        opacity: 1,
        onComplete: onDeselectAnimationComplete,
        ease: "power2.in",
      },
      "<s"
    );
  };

  return (
    <div className="sm:col-start-1 sm:col-span-5 mt-24">
      <div className="mb-32">
        <div className="overflow-hidden">
          <h2 className="modal text-7xl font-semibold  uppercase opacity-0 translate-y-[5rem]">
            {coffee.title}
          </h2>
        </div>
        <div className="overflow-hidden mt-4">
          <h2 className="modal text-5xl font-semibold  uppercase opacity-0 translate-y-[5rem]">
            {coffee.subtitle}
          </h2>
        </div>
      </div>
      <div className="modal opacity-0 translate-y-[5rem]">
        <p className="text-4xl mb-12">{t[coffee.description]}</p>

        <div className="flex gap-8 justify-between">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={coffee.src}
            className="text-2xl font-semibold block group transition duration-300 "
          >
            {t.modalLink}
            <span className="link-underline block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5"></span>
          </a>
        </div>
      </div>
      <div className="overflow-hidden mt-24">
        <div className="flex justify-between gap-4 modal opacity-0 translate-y-[5rem]">
          <p className="text-lg">({t.modalOrigin})</p>
          <p className="text-xl">{coffee.origin}</p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex justify-between gap-4 modal opacity-0 translate-y-[5rem]">
          <p className="text-lg">({t.modalProcess})</p>
          <p className="text-xl">{t[coffee.process]}</p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex justify-between gap-4 modal opacity-0 translate-y-[5rem]">
          <p className="text-lg">(Altitude)</p>
          <p className="text-xl">{coffee.altitude}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeInfo;
