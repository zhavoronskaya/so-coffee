"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useApp from "@/hooks/useApp";
import { Location } from "@/types";
import { MapPinSvg } from "../Icons";
import { useTheme } from "@/app/context/ThemeContext";

gsap.registerPlugin(useGSAP);

//animation with GSAP
// const LocationSelectedImage = ({location}: ImageProps) => {
//   const app = useApp({ watch: ["hoveredLocation"] });

//   useGSAP(
//     () => {
//       const hoveredLoaction = app.state.hoveredLocation;
//       const tl = gsap.timeline();

//       tl.to(
//         ".porto1",
//         {
//           duration: 0.4,
//           y: hoveredLoaction === "porto1" ? 0 : 100,
//           opacity: hoveredLoaction === "porto1" ? 1 : 0,
//           ease: "power2.out",
//           immediateRender: false,
//         },
//         "<"
//       );
//       tl.to(
//         ".porto2",
//         {
//           duration: 0.4,
//           y: hoveredLoaction === "porto2" ? 0 : 100,
//           opacity: hoveredLoaction === "porto2" ? 1 : 0,
//           ease: "power2.out",
//           immediateRender: false,
//         },
//         "<"
//       );
//       tl.to(
//         ".porto3",
//         {
//           duration: 0.4,
//           y: hoveredLoaction === "porto3" ? 0 : 100,
//           opacity: hoveredLoaction === "porto3" ? 1 : 0,
//           ease: "power2.out",
//           immediateRender: false,
//         },
//         "<"
//       );
//       tl.to(
//         ".lisbon",
//         {
//           duration: 0.4,
//           y: hoveredLoaction === "lisbon" ? 0 : 100,
//           opacity: hoveredLoaction === "lisbon" ? 1 : 0,
//           ease: "power2.out",
//           immediateRender: false,
//         },
//         "<"
//       );
//     },
//     {
//       dependencies: [app.state.hoveredLocation],
//     }
//   );

//   const { hoveredLocation } = app.getState();
//   const isActive = location === hoveredLocation;
//   return (
//     <div className=" overflow-hidden h-[32rem] sm:h-full relative mb-24 sm:mb-0">
//       <a
//         className="six-block-el porto1 opacity-0 translate-y-[8rem] absolute top-0 left-0"
//         target="_blank"
//         rel="noopener noreferrer"
//         href={"https://maps.app.goo.gl/7WSz4VYKi7r667WX9"}
//         style={{
//           opacity: isActive ? "1" : "0.4",
//           translate: transform;

//           transition: "opacity .2s ease",
//         }}
//       >
//         <Image
//           aria-hidden
//           src="/images/porto1.jpg"
//           alt="logo"
//           width={840}
//           height={768}
//           className="object-cover block h-full w-full rounded-lg "
//           priority={true}
//         />
//       </a>
//       <a
//         className=" porto2 opacity-0 translate-y-[8rem] absolute top-0 left-0"
//         target="_blank"
//         rel="noopener noreferrer"
//         href={"https://maps.app.goo.gl/Vi8agxV6KQTWaGTS7"}
//       >
//         <Image
//           aria-hidden
//           src="/images/porto2.jpg"
//           alt="logo"
//           width={840}
//           height={768}
//           className="object-cover block h-full w-full rounded-lg "
//           priority={true}
//         />
//       </a>
//       <a
//         className="porto3 opacity-0 translate-y-[8rem] absolute top-0 left-0"
//         target="_blank"
//         rel="noopener noreferrer"
//         href={"https://maps.app.goo.gl/MC7BHWRy5g7hgyf6A"}
//       >
//         <Image
//           aria-hidden
//           src="/images/porto3.jpg"
//           alt="logo"
//           width={840}
//           height={768}
//           className="object-cover block h-full w-full rounded-lg "
//           priority={true}
//         />
//       </a>
//       <a
//         className="lisbon opacity-0 translate-y-[8rem] absolute top-0 left-0"
//         target="_blank"
//         rel="noopener noreferrer"
//         href={"https://maps.app.goo.gl/eaYQTiQDyN9CbySt7"}
//       >
//         <Image
//           aria-hidden
//           src="/images/lisbon2.jpg"
//           alt="logo"
//           width={840}
//           height={768}
//           className="object-cover block h-full w-full rounded-lg "
//           priority={true}
//         />
//       </a>
//     </div>
//   );
// };

// export default LocationSelectedImage;

const LocationSelectedImages = () => {
  const { theme } = useTheme();

  const scrP1 =
    theme === "dark" ? "/images/porto1Inv.jpg" : "/images/porto1.jpg";
  const scrP2 =
    theme === "dark" ? "/images/porto2Inv.jpg" : "/images/porto2.jpg";
  const scrP3 =
    theme === "dark" ? "/images/porto3Inv.jpg" : "/images/porto3.jpg";
  const scrL =
    theme === "dark" ? "/images/lisbon2Inv.jpg" : "/images/lisbon2.jpg";
  return (
    <div className="overflow-hidden h-[32rem] sm:h-full relative mb-24 sm:mb-0">
      <div className="relative h-full six-block-el translate-y-[8rem] opacity-0 mix-blend-difference ">
        <LocationSelectedImage
          location="porto1"
          src={scrP1}
          href="https://www.google.com/maps/place/SO+Coffee+Roasters/@41.1461106,-8.62086,21z/data=!4m6!3m5!1s0xd246548c5627d47:0x79d0ccab60f5c4c0!8m2!3d41.1460503!4d-8.6206796!16s%2Fg%2F11vb1gt3rz?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D"
          left={42}
          top={44}
        />
        <LocationSelectedImage
          location="porto2"
          src={scrP2}
          href="https://www.google.com/maps/place/SO+Coffee+Roasters/@41.1484471,-8.6176672,17z/data=!3m1!4b1!4m6!3m5!1s0xd24655d75e6084b:0x80e672e1e201eae6!8m2!3d41.1484471!4d-8.6150923!16s%2Fg%2F11qpv1gxdk?entry=ttu"
          left={50}
          top={38}
        />
        <LocationSelectedImage
          location="porto3"
          src={scrP3}
          href="https://www.google.com/maps/place/So+Coffee+Roasters+-+The+Feeting+Room/@41.1456816,-8.6150516,17z/data=!3m1!4b1!4m6!3m5!1s0xd24654154041ac5:0x51465a108f51f170!8m2!3d41.1456816!4d-8.6124767!16s%2Fg%2F11h196fjlc?entry=ttu"
          left={48}
          top={46}
        />
        <LocationSelectedImage
          location="lisbon"
          src={scrL}
          href="https://www.google.com/maps/place/SO+Coffee+Roasters/@38.7113166,-9.1402203,17z/data=!3m1!4b1!4m6!3m5!1s0xd1935dd1bb851d3:0xd818663d7b86b27!8m2!3d38.7113166!4d-9.1402203!16s%2Fg%2F11h71hxjv4?entry=ttu"
          left={49}
          top={44}
        />
      </div>
    </div>
  );
};

type ImageProps = {
  location: Location;
  href: string;
  src: string;
  top: number;
  left: number;
};

const LocationSelectedImage = ({
  location,
  href,
  src,
  top,
  left,
}: ImageProps) => {
  const app = useApp({ watch: ["hoveredLocation"] });
  const { hoveredLocation } = app.getState();
  const isActive = location === hoveredLocation;
  const resultHref = isActive ? href : undefined;

  return (
    <a
      className="six-block-el w-full h-full opacity-0 translate-y-[8rem] absolute top-0 left-0"
      target="_blank"
      rel="noopener noreferrer"
      style={{ pointerEvents: isActive ? "auto" : "none" }}
      href={resultHref}
    >
      <Image
        aria-hidden
        src={src}
        alt="logo"
        width={840}
        height={768}
        className="object-cover block h-full w-full rounded-lg translate-y-[8rem]"
        style={{
          opacity: isActive ? "1" : "0.0",
          transform: isActive ? "translateY(0)" : "translateY(8rem)",
          transition: "all .4s ease",
        }}
        priority={true}
      />
      <MapPinSvg
        className="absolute z-20"
        style={{
          left: `calc(${left}% - 11px)`,
          top: `calc(${top}% - 26px)`,
          opacity: isActive ? "1" : "0.0",
          transform: isActive ? "translateY(0)" : "translateY(8rem)",
          transition: "all .4s ease 0.2s",
        }}
      />
    </a>
  );
};

export default LocationSelectedImages;
