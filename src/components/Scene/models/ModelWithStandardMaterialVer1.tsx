import { forwardRef } from "react";
import { Mesh, Object3D, Object3DEventMap } from "three";
import useModelTexture from "../hooks/useModelTexture";

type Props = {
  textureUrl?: string;
  alphaTest?: number;
  node: Object3D<Object3DEventMap>;
  transparent?: boolean;
  castShadow?: boolean;
};

const ModelStandard1 = forwardRef<Mesh, Props>(function Model(
  { textureUrl = "", node, transparent = false },
  ref
) {
  const texture = useModelTexture(textureUrl);

  return (
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
  );
});

export default ModelStandard1;
