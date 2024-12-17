import {
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Object3DEventMap,
} from "three";

import useModelTexture from "../hooks/useModelTexture";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import CameraRig from "../camera/CameraRig";
import useGroupOpacity from "../hooks/useGroupOpacity";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type Props = {
  nodeBeans: Object3D<Object3DEventMap>;
  nodeLeaf: Object3D<Object3DEventMap>;
};

const TreeModel = ({ nodeBeans, nodeLeaf }: Props) => {
  const beanMaterialRef = useRef<MeshBasicMaterial | null>(null);
  const groupRef = useRef<Group | null>(null);

  const textureLeafs = useModelTexture("/textures/leafCopy1.jpg");
  const textureBeans = useModelTexture("/textures/beans.jpg");

  // useGSAP(
  //   () => {
  //     const tl = gsap.timeline({
  //       defaults: { immediateRender: false },
  //       scrollTrigger: ".beans",
  //     });

  //     if (!beanMaterialRef.current) return;
  //     tl.fromTo(
  //       beanMaterialRef.current,
  //       { opacity: beanMaterialRef.current.opacity },
  //       {
  //         opacity: 1,
  //         duration: 0.1,
  //         ease: "power1.inOut",
  //         // onComplete: () => {
  //         //   if (!beanMaterialRef.current) return;
  //         //   beanMaterialRef.current.alphaTest = 0;
  //         // },
  //       },
  //       "<"
  //     );
  //   },
  //   { dependencies: [] }
  // );

  useGroupOpacity(groupRef, ".section-3");

  return (
    // <Float>
    <CameraRig>
      <group
        position={[-2.5, -1, 0]}
        rotation={[Math.PI / 6, 0, 0]}
        ref={groupRef}
      >
        <mesh
          geometry={(nodeBeans as Mesh).geometry}
          position={(nodeBeans as Mesh).position}
          rotation={(nodeBeans as Mesh).rotation}
          scale={(nodeBeans as Mesh).scale}
        >
          <meshBasicMaterial
            ref={beanMaterialRef}
            map={textureBeans}
            transparent
            alphaHash
            // alphaTest={0.2}
          />
        </mesh>
        <mesh
          geometry={(nodeLeaf as Mesh).geometry}
          position={(nodeLeaf as Mesh).position}
          rotation={(nodeLeaf as Mesh).rotation}
          scale={(nodeLeaf as Mesh).scale}
        >
          <meshBasicMaterial
            map={textureLeafs}
            transparent
            alphaHash

            // alphaTest={0}
          />
        </mesh>
        {/* 
        <Model textureUrl={"/textures/beans.jpg"} node={nodeBeans} />
        <Model
          textureUrl={"/textures/branch-baked.jpg"}
          node={nodeLeaf}
          alphaMap={alpha}
        /> */}
      </group>
    </CameraRig>
    // </Float>
  );
};

export default TreeModel;
