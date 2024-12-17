import { Group, Mesh, Object3D, Object3DEventMap } from "three";
import { forwardRef, useRef } from "react";
import useModelTexture from "../hooks/useModelTexture";
import useGroupOpacity from "../hooks/useGroupOpacity";

type Props = {
  textureUrl?: string;
  alphaTest?: number;
  node: Object3D<Object3DEventMap>;
  transparent?: boolean;
  castShadow?: boolean;
  trigger: string;
  ignoreGroupOpacity?: boolean;
};

const ModelStandard = forwardRef<Mesh, Props>(function Model(
  {
    textureUrl = "",
    node,
    transparent = false,
    trigger = "",
    ignoreGroupOpacity = false,
  },
  ref
) {
  const texture = useModelTexture(textureUrl);

  const groupRef = useRef<Group | null>(null);
  useGroupOpacity(groupRef, trigger, ignoreGroupOpacity);

  return (
    <group ref={groupRef}>
      <mesh
        ref={ref}
        geometry={(node as Mesh).geometry}
        position={(node as Mesh).position}
        rotation={(node as Mesh).rotation}
        scale={(node as Mesh).scale}
        castShadow
        receiveShadow
      >
        <meshPhongMaterial
          map={texture}
          transparent={transparent}
          alphaTest={0.0}
          alphaHash
        />
      </mesh>
    </group>
  );
});

export default ModelStandard;
