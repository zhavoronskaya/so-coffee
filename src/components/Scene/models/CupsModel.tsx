import { useRef, useState } from "react";
import {
  Euler,
  InstancedMesh,
  Mesh,
  Object3D,
  Object3DEventMap,
  RepeatWrapping,
  Vector2,
  Vector3,
} from "three";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGLTF, useTexture } from "@react-three/drei";
import { InstancedRigidBodies, RigidBody } from "@react-three/rapier";

import ModelStandard from "./ModelWithStandardMaterial";
import { isMaterial } from "../helpers/Material";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type Props = {
  nodeCups: Object3D<Object3DEventMap>;
  nodeTable: Object3D<Object3DEventMap>;
  beansPosition: Vector3;
};
const count = 40;
const normalScale = new Vector2(1, 1);

const instances = Array.from({ length: count }, (_, i) => ({
  key: i,
  position: new Vector3(Math.random() - 0.5, 2 + i / 2, Math.random() - 0.5),
  rotation: new Euler(Math.random(), Math.random(), Math.random()),
}));

const CupsModel = ({ nodeCups, nodeTable, beansPosition }: Props) => {
  const beanModel = useGLTF("/model/bean.glb");
  const normalMapTexture = useTexture("/textures/normal.jpg");
  normalMapTexture.wrapS = RepeatWrapping;
  normalMapTexture.wrapT = RepeatWrapping;
  normalMapTexture.repeat.set(1, 1);
  const ref = useRef<InstancedMesh | null>(null);
  const [activeFallingBeans, setActiveFallingBeans] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { immediateRender: false },
        scrollTrigger: { trigger: ".beanstrigger" },
      });
      tl.to(
        ".beanstrigger",
        {
          opacity: 1,

          onComplete: () => {
            setActiveFallingBeans(true);
          },
          delay: 0.5,
        },
        "<"
      );
    },
    { dependencies: [] }
  );

  useGSAP(
    () => {
      const tl = gsap.timeline();
      if (!activeFallingBeans) return;
      if (!ref.current) return;
      const material = ref.current.material;

      if (isMaterial(material)) {
        material.needsUpdate = true;

        tl.to(material, {
          opacity: 0,
          scrollTrigger: {
            trigger: ".section-5",
            start: "top bottom",
            end: "top 30%",
            scrub: 0.5,
          },
          onUpdate: () => {
            material.needsUpdate = true;
          },
        });
      }
    },
    { dependencies: [activeFallingBeans] }
  );

  return (
    <group>
      {/* <RigidBody
        type="fixed"
        restitution={0.0}
        friction={1}
        colliders="trimesh"
      >
        <Model textureUrl={"/textures/cups.jpg"} node={nodeCups} />
      </RigidBody> */}
      <ModelStandard
        textureUrl={"/textures/cups.jpg"}
        node={nodeCups}
        transparent
        trigger=".section-5"
      />
      <RigidBody type="fixed" restitution={0.0} friction={1} colliders="cuboid">
        <ModelStandard
          textureUrl={"/textures/tlc.jpg"}
          node={nodeTable}
          alphaTest={0}
          transparent
          trigger=".section-5"
        />
      </RigidBody>

      {activeFallingBeans && (
        <InstancedRigidBodies
          instances={instances}
          colliders="hull"
          type="dynamic"
          restitution={0}
          friction={1}
          canSleep={true}
          position={beansPosition}
        >
          <instancedMesh
            ref={ref}
            args={[
              (beanModel.scene.children[0] as Mesh).geometry,
              undefined,
              count,
            ]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={"#3B140B"}
              normalMap={normalMapTexture}
              normalScale={normalScale}
              transparent
            />
          </instancedMesh>
        </InstancedRigidBodies>
      )}
    </group>
  );
};

export default CupsModel;
