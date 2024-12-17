import { Object3D, Object3DEventMap } from "three";
import Model from "./ModelWithBasicMaterial";
import Smoke from "../environment/Smoke";
import CameraRig from "../camera/CameraRig";

type Props = {
  nodeTable: Object3D<Object3DEventMap>;
  nodeFlower: Object3D<Object3DEventMap>;
};

const CoffeTableModel = ({ nodeTable, nodeFlower }: Props) => {
  return (
    <CameraRig>
      <group rotation={[0, -(Math.PI * 4) / 2, 0]}>
        <Smoke />

        <Model
          textureUrl={"/textures/cft.jpg"}
          node={nodeTable}
          trigger={".section-6"}
          transparent
          alphaTest={0}
        />
        <Model
          textureUrl={"/textures/flower-backed.jpg"}
          node={nodeFlower}
          trigger={".section-6"}
          transparent
          alphaTest={0}
        />
      </group>
    </CameraRig>
  );
};

export default CoffeTableModel;
