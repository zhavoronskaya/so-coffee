import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SoftShadows } from "@react-three/drei";

import {
  CAMERA_POSITIONINGS_MAP,
  CAMERA_POSITIONINGS_MAP_TOUCH_SCREEN,
} from "./CameraLightSettings";
import isMobile from "../helpers/DeviceDefenition";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);
const cameraTarget = new THREE.Vector3(0, 10, 0);

export default function Animations() {
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
  const lightTargetRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const { size, camera, get: getThreeState } = useThree();

  const touchScreen =
    isMobile().phone || (isMobile().tablet && size.width < 1024);

  const cameraData = touchScreen
    ? CAMERA_POSITIONINGS_MAP_TOUCH_SCREEN
    : CAMERA_POSITIONINGS_MAP;

  useFrame(() => {
    camera.lookAt(cameraTarget);
  });

  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (!directionalLightRef.current) return;

      const data = {
        offsetX: camera.view?.offsetX || 0,
      };

      const updateCameraView = () => {
        const { size } = getThreeState();
        const { width, height } = size;
        camera.setViewOffset(width, height, data.offsetX, 0, width, height);
        // camera.updateMatrix();
        // camera.updateProjectionMatrix();
        // console.log("UPDATE", camera.view?.offsetX, width, height);
      };

      tl.fromTo(
        camera.position,
        {
          x: cameraData["default"].position.x,
          y: cameraData["default"].position.y,
          z: cameraData["default"].position.z,
        },
        {
          x: cameraData["tree"].position.x,
          y: cameraData["tree"].position.y,
          z: cameraData["tree"].position.z,
          ease: "power1.inOut",
          onUpdate: () => {
            directionalLightRef.current?.position.set(
              camera.position.z,
              camera.position.y,
              camera.position.z
            );
            lightTargetRef.current.position.set(
              cameraTarget.x,
              cameraTarget.y - 30,
              cameraTarget.z
            );

            lightTargetRef.current.updateMatrix();
            lightTargetRef.current.updateMatrixWorld();
            directionalLightRef.current?.updateMatrix();
            directionalLightRef.current?.updateMatrixWorld();
          },

          scrollTrigger: {
            trigger: ".section-2",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
      tl.fromTo(
        cameraTarget,
        {
          x: cameraData["default"].target.x,
          y: cameraData["default"].target.y,
          z: cameraData["default"].target.z,
        },
        {
          x: cameraData["tree"].target.x,
          y: cameraData["tree"].target.y,
          z: cameraData["tree"].target.z,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".section-2",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
        "<"
      )
        .to(
          ".section-1",
          {
            opacity: 0,
            scrollTrigger: {
              trigger: ".section-2",
              start: "top bottom",
              end: "top 30%",
              scrub: 0.5,
            },
          },
          "<"
        )
        .fromTo(
          data,
          { offsetX: cameraData["default"].offsetX },
          {
            offsetX: cameraData["tree"].offsetX,
            ease: "power1.inOut",
            immediateRender: false,
            onUpdate: updateCameraView,
            scrollTrigger: {
              trigger: ".section-2",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
          "<"
        )
        .fromTo(
          camera.position,
          {
            x: cameraData["tree"].position.x,
            y: cameraData["tree"].position.y,
            z: cameraData["tree"].position.z,
          },
          {
            x: cameraData["packs"].position.x,
            y: cameraData["packs"].position.y,
            z: cameraData["packs"].position.z,
            ease: "power1.inOut",
            immediateRender: false,
            onUpdate: () => {
              directionalLightRef.current?.position.set(
                camera.position.z,
                camera.position.y,
                camera.position.z
              );
              lightTargetRef.current.position.set(
                cameraTarget.x,
                cameraTarget.y - 30,
                cameraTarget.z
              );

              lightTargetRef.current.updateMatrix();
              lightTargetRef.current.updateMatrixWorld();
              directionalLightRef.current?.updateMatrix();
              directionalLightRef.current?.updateMatrixWorld();
            },

            scrollTrigger: {
              trigger: ".section-3",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        )
        .fromTo(
          cameraTarget,
          {
            x: cameraData["tree"].target.x,
            y: cameraData["tree"].target.y,
            z: cameraData["tree"].target.z,
          },
          {
            x: cameraData["packs"].target.x,
            y: cameraData["packs"].target.y,
            z: cameraData["packs"].target.z,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-3",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
          "<"
        )
        .to(
          ".section-2",
          {
            opacity: 0,
            scrollTrigger: {
              trigger: ".section-3",
              start: "top bottom",
              end: "top 30%",
              scrub: 0.5,
            },
          },
          "<"
        )
        .fromTo(
          data,
          { offsetX: cameraData["tree"].offsetX },
          {
            offsetX: cameraData["packs"].offsetX,
            ease: "power1.inOut",
            immediateRender: false,
            onUpdate: updateCameraView,
            scrollTrigger: {
              trigger: ".section-3",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
          "<"
        )

        .fromTo(
          camera.position,
          {
            x: cameraData["packs"].position.x,
            y: cameraData["packs"].position.y,
            z: cameraData["packs"].position.z,
          },
          {
            x: cameraData["cups"].position.x,
            y: cameraData["cups"].position.y,
            z: cameraData["cups"].position.z,
            ease: "power1.inOut",
            immediateRender: false,
            onUpdate: () => {
              directionalLightRef.current?.position.set(
                camera.position.z,
                camera.position.y,
                camera.position.z
              );
              lightTargetRef.current.position.set(
                cameraTarget.x,
                cameraTarget.y - 30,
                cameraTarget.z
              );

              lightTargetRef.current.updateMatrix();
              lightTargetRef.current.updateMatrixWorld();
              directionalLightRef.current?.updateMatrix();
              directionalLightRef.current?.updateMatrixWorld();
            },
            scrollTrigger: {
              trigger: ".section-4",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        )
        .fromTo(
          cameraTarget,
          {
            x: cameraData["packs"].target.x,
            y: cameraData["packs"].target.y,
            z: cameraData["packs"].target.z,
          },
          {
            x: cameraData["cups"].target.x,
            y: cameraData["cups"].target.y,
            z: cameraData["cups"].target.z,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-4",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
          "<"
        )
        .fromTo(
          data,
          { offsetX: cameraData["packs"].offsetX },
          {
            offsetX: cameraData["cups"].offsetX,
            ease: "power1.inOut",
            immediateRender: false,
            onUpdate: updateCameraView,
            scrollTrigger: {
              trigger: ".section-4",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
          "<"
        )
        .fromTo(
          camera.position,
          {
            x: cameraData["cups"].position.x,
            y: cameraData["cups"].position.y,
            z: cameraData["cups"].position.z,
          },
          {
            x: cameraData["table"].position.x,
            y: cameraData["table"].position.y,
            z: cameraData["table"].position.z,
            ease: "power1.inOut",
            immediateRender: false,
            onUpdate: () => {
              directionalLightRef.current?.position.set(
                camera.position.z,
                camera.position.y,
                camera.position.z
              );
              lightTargetRef.current.position.set(
                cameraTarget.x,
                cameraTarget.y - 30,
                cameraTarget.z
              );

              lightTargetRef.current.updateMatrix();
              lightTargetRef.current.updateMatrixWorld();
              directionalLightRef.current?.updateMatrix();
              directionalLightRef.current?.updateMatrixWorld();
            },
            scrollTrigger: {
              trigger: ".section-5",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        )
        .fromTo(
          cameraTarget,
          {
            x: cameraData["cups"].target.x,
            y: cameraData["cups"].target.y,
            z: cameraData["cups"].target.z,
          },
          {
            x: cameraData["table"].target.x,
            y: cameraData["table"].target.y,
            z: cameraData["table"].target.z,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-5",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
          "<"
        )
        .fromTo(
          data,
          { offsetX: cameraData["cups"].offsetX },
          {
            offsetX: cameraData["table"].offsetX,
            ease: "power1.inOut",
            immediateRender: false,
            onUpdate: updateCameraView,
            scrollTrigger: {
              trigger: ".section-5",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
          "<"
        )
        .fromTo(
          camera.position,
          {
            x: cameraData["table"].position.x,
            y: cameraData["table"].position.y,
            z: cameraData["table"].position.z,
          },
          {
            x: cameraData["maps"].position.x,
            y: cameraData["maps"].position.y,
            z: cameraData["maps"].position.z,
            ease: "power1.inOut",
            immediateRender: false,

            scrollTrigger: {
              trigger: ".section-6",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        )
        .fromTo(
          cameraTarget,
          {
            x: cameraData["table"].target.x,
            y: cameraData["table"].target.y,
            z: cameraData["table"].target.z,
          },
          {
            x: cameraData["maps"].target.x,
            y: cameraData["maps"].target.y,
            z: cameraData["maps"].target.z,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-6",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
          "<"
        )
        .fromTo(
          data,
          { offsetX: cameraData["table"].offsetX },
          {
            offsetX: cameraData["maps"].offsetX,
            ease: "power1.inOut",
            immediateRender: false,
            onUpdate: updateCameraView,
            scrollTrigger: {
              trigger: ".section-6",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
          "<"
        );
    },
    { dependencies: [] }
  );

  return (
    <>
      <directionalLight
        castShadow
        target={lightTargetRef.current}
        intensity={3}
        shadow-mapSize={2048}
        shadow-bias={-0.001}
        ref={directionalLightRef}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-40, 40, -40, 40, 0.1, 400]}
        />
      </directionalLight>
      <SoftShadows samples={10} size={6} />
    </>
  );
}
