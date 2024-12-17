import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef } from "react";
import { Group, Vector3 } from "three";
import useWindowPointerFromCenter from "../hooks/usePointerMove";
import Device from "@/ui/utils/device";

type Props = {
  children: React.ReactNode;
  log?: boolean;
};
const touch = Device.isTouchScreen();
export default function CameraRig({ children, log }: Props) {
  const groupRef = useRef<Group | null>(null);
  const pointer = useWindowPointerFromCenter();

  useEffect(() => {
    const handleResize = () => {
      if (!groupRef.current) return;
      if (log) {
        console.log(
          "Resize: ",
          `${groupRef.current.rotation.x.toFixed(
            4
          )} ${groupRef.current.rotation.y.toFixed(4)}`
        );
      }
      groupRef.current.rotation.set(0, 0, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const { getCurrentViewport } = useThree((state) => state.viewport);
  const { viewport } = useThree();

  const rotateModel = (group: Group, delta: number) => {
    if (!touch) {
      return easing.damp3(
        group.rotation as unknown as Vector3,
        [
          (-pointer.current.y * viewport.height) / 120,
          (pointer.current.x * viewport.width) / 96,
          0,
        ],
        0.5,
        delta
      );
    } else {
      return easing.damp3(
        group.rotation as unknown as Vector3,
        [0, (pointer.current.x * viewport.width) / 180, 0],
        0.5,
        delta
      );
    }
  };
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    rotateModel(groupRef.current, delta);
  });

  return <group ref={groupRef}>{children}</group>;
}
