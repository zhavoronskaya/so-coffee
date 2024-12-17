"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useApp from "@/hooks/useApp";
import Device from "@/ui/utils/device";
import { Location } from "@/types";

gsap.registerPlugin(useGSAP);

const LocationSelectButtons = () => {
  return (
    <div>
      <div className="overflow-hidden ">
        <div className="six-block-el translate-y-[8rem] opacity-0 mix-blend-difference ">
          <Button
            href="https://www.google.com/maps/place/SO+Coffee+Roasters/@41.1461106,-8.62086,21z/data=!4m6!3m5!1s0xd246548c5627d47:0x79d0ccab60f5c4c0!8m2!3d41.1460503!4d-8.6206796!16s%2Fg%2F11vb1gt3rz?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            location="porto1"
          >
            Porto, Rua da Restauração 475
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="six-block-el translate-y-[8rem] opacity-0 mix-blend-difference">
          <Button
            href="https://www.google.com/maps/place/SO+Coffee+Roasters/@41.1484471,-8.6176672,17z/data=!3m1!4b1!4m6!3m5!1s0xd24655d75e6084b:0x80e672e1e201eae6!8m2!3d41.1484471!4d-8.6150923!16s%2Fg%2F11qpv1gxdk?entry=ttu"
            location="porto2"
          >
            Porto, Rua Sá de Noronha 119
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="six-block-el translate-y-[8rem] opacity-0 mix-blend-difference">
          <Button
            href="https://www.google.com/maps/place/So+Coffee+Roasters+-+The+Feeting+Room/@41.1456816,-8.6150516,17z/data=!3m1!4b1!4m6!3m5!1s0xd24654154041ac5:0x51465a108f51f170!8m2!3d41.1456816!4d-8.6124767!16s%2Fg%2F11h196fjlc?entry=ttu"
            location="porto3"
          >
            Porto, Largo dos Lóios 80
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="six-block-el translate-y-[8rem] opacity-0 mix-blend-difference ">
          <Button
            href="https://www.google.com/maps/place/SO+Coffee+Roasters/@38.7113166,-9.1402203,17z/data=!3m1!4b1!4m6!3m5!1s0xd1935dd1bb851d3:0xd818663d7b86b27!8m2!3d38.7113166!4d-9.1402203!16s%2Fg%2F11h71hxjv4?entry=ttu"
            location="lisbon"
          >
            Lisbon, Calçada do Sacramento 28
          </Button>
        </div>
      </div>
    </div>
  );
};

type ButtonProps = {
  location: Location;
  children: React.ReactNode;
  href: string;
};
const Button = ({ location, children, href }: ButtonProps) => {
  const app = useApp({ watch: ["hoveredLocation"] });
  const { hoveredLocation } = app.getState();
  const isTouchScreen = Device.isTouchScreen();
  const isActive = location === hoveredLocation;

  const onPointerEnter = () => {
    app.setState({ hoveredLocation: location });
  };

  return (
    <a
      className={`uppercase text-[2.8rem]/[1] sm:text-6xl pb-8 sm:pb-0 font-semibold text-start tracking-tight relative`}
      style={{
        opacity: isActive ? "1" : "0.4",
        transition: "opacity .2s ease",
      }}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      onClick={(e) => {
        if (isTouchScreen) e.preventDefault();
      }}
      onPointerEnter={onPointerEnter}
    >
      {children}
    </a>
  );
};
export default LocationSelectButtons;
