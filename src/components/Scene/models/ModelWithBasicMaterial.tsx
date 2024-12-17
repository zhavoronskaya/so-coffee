import { Group, Mesh, Object3D, Object3DEventMap, Texture } from "three";
import { forwardRef, useRef } from "react";
import useModelTexture from "../hooks/useModelTexture";
import useGroupOpacity from "../hooks/useGroupOpacity";

type Props = {
  textureUrl: string;
  alphaMap?: Texture | null;
  alphaTest?: number;
  node: Object3D<Object3DEventMap>;
  transparent?: boolean;
  trigger?: string;
};

const Model = forwardRef<Mesh, Props>(function Model(
  { textureUrl, node, alphaTest = 0, transparent = false, trigger = "" },
  ref
) {
  const texture = useModelTexture(textureUrl);

  const groupRef = useRef<Group | null>(null);
  useGroupOpacity(groupRef, trigger);
  return (
    <group ref={groupRef}>
      <mesh
        ref={ref}
        geometry={(node as Mesh).geometry}
        position={(node as Mesh).position}
        rotation={(node as Mesh).rotation}
        scale={(node as Mesh).scale}
      >
        <meshBasicMaterial
          map={texture}
          transparent={transparent}
          alphaTest={alphaTest}
          // alphaMap={alphaMap}
          alphaHash
        />
      </mesh>
    </group>
  );
});

export default Model;
