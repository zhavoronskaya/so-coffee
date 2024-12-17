import { useLoader } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { SVGLoader } from "three/examples/jsm/Addons.js";

import { Physics, RigidBody } from "@react-three/rapier";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Group, MeshLambertMaterial } from "three";
import CameraRig from "../camera/CameraRig";
import useGroupOpacity from "../hooks/useGroupOpacity";
import { useTheme } from "@/app/context/ThemeContext";
import { Outlines } from "@react-three/drei";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const Logo = () => {
  const materialLogoRefs = useRef<Array<MeshLambertMaterial | null>>([]);
  const [startOpacityAnomationFinished, setStartOpacityAnomationFinished] =
    useState(false);
  const svgData = useLoader(SVGLoader, "/so-logo.svg");
  const shapes = useMemo(() => {
    return svgData.paths.map((p) => p.toShapes(false));
  }, [svgData]);

  useGSAP(
    () => {
      materialLogoRefs.current.toReversed().forEach((material, idx) => {
        if (!material) return;
        const tl = gsap.timeline();
        tl.fromTo(
          material,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "sine.in",
            delay: 0.1 * idx,
            onUpdate: () => {
              material.needsUpdate = true;
            },
            onComplete: () => {
              material.opacity = 1;
              setStartOpacityAnomationFinished(true);
            },
          },
          "<"
        );
      });
    },
    { dependencies: [] }
  );

  useGSAP(
    () => {
      if (startOpacityAnomationFinished) {
        materialLogoRefs.current.forEach((material) => {
          const tl = gsap.timeline({
            defaults: { immediateRender: false },
            scrollTrigger: {
              trigger: ".section-2",
              start: "top bottom",
              end: "top 30%",
              scrub: 0.5,
            },
          });
          if (!material) return;
          tl.fromTo(
            material,
            { opacity: 1 },
            {
              opacity: 0,
              onUpdate: () => {
                material.needsUpdate = true;
              },
            },
            "<"
          );
        });
      }
    },
    { dependencies: [startOpacityAnomationFinished] }
  );
  const sphereRef = useRef<Group | null>(null);
  const groundRef = useRef<Group | null>(null);
  useGroupOpacity(sphereRef, ".section-2");
  useGroupOpacity(groundRef, ".section-2");

  const { theme } = useTheme();

  return (
    <>
      <CameraRig>
        <Physics>
          <RigidBody type="fixed" restitution={0.2} friction={0.5}>
            <group ref={groundRef}>
              <mesh
                position={[0, -2.4, 4.4]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
              >
                <planeGeometry args={[80, 80]} />
                <shadowMaterial transparent opacity={0.3} />
              </mesh>
            </group>
          </RigidBody>

          <RigidBody
            colliders="ball"
            type="dynamic"
            canSleep={false}
            restitution={0.4}
            friction={0.2}
            position={[0.1, 14, -2.2]}
          >
            <group ref={sphereRef}>
              <mesh position={[0, 0, 2.4]} castShadow>
                <sphereGeometry args={[2.4, 64, 32]} />
                <meshLambertMaterial color={"#72B4CC"} transparent />
              </mesh>
            </group>
          </RigidBody>
        </Physics>

        <group>
          {shapes.map((s, idx) => (
            <mesh
              key={idx}
              scale={0.004}
              rotation={[1 * Math.PI, 0, 0]}
              position={[-1.8, 0, 4.8]}
              castShadow
            >
              <extrudeGeometry
                key={idx}
                args={[
                  s,
                  {
                    depth: 10,
                    bevelEnabled: false,
                    steps: 30,
                  },
                ]}
              />

              <meshLambertMaterial
                transparent
                color={"black"}
                opacity={0}
                ref={(v) => {
                  materialLogoRefs.current[idx] = v;
                }}
              />
              {theme === "dark" && (
                <Outlines
                  thickness={0.8}
                  color="#72B4CC"
                  transparent
                  opacity={0.8}
                />
              )}
            </mesh>
          ))}
        </group>
      </CameraRig>
    </>
  );
};

export default Logo;
