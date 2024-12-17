import { Sparkles, useGLTF } from "@react-three/drei";

import { Physics } from "@react-three/rapier";

import { useThree } from "@react-three/fiber";
import {
  MODELS_POSITIONINGS_MAP,
  MODELS_POSITIONINGS_MAP_TOUCH_SCREEN,
} from "./ModelsPositionSettings";
import TreeModel from "./TreeModel";
import CupsModel from "./CupsModel";
import PacksModel from "./PacksModel";
import CoffeTableModel from "./CoffeTableModel";
import CameraRig from "../camera/CameraRig";
import isMobile from "../helpers/DeviceDefenition";

const Models = () => {
  const model = useGLTF("/model/socoffee.glb");

  const { size } = useThree();

  const touchScreen =
    isMobile().phone || (isMobile().tablet && size.width < 1024);

  const positions = touchScreen
    ? MODELS_POSITIONINGS_MAP_TOUCH_SCREEN
    : MODELS_POSITIONINGS_MAP;
  return (
    <group>
      <group position={positions.tree.position} scale={2.0}>
        <Sparkles
          count={300}
          scale={7}
          size={20}
          speed={3}
          color={"white"}
          position={[0, 0, 3]}
        />
        <TreeModel nodeBeans={model.nodes.beans} nodeLeaf={model.nodes.leafs} />
      </group>

      <group
        position={positions.packs.position}
        rotation={[0, -Math.PI / 40, 0]}
      >
        <CameraRig>
          {/* <Particles /> */}
          <PacksModel
            nodeTable={model.nodes.table}
            nodePacksColumbia={model.nodes.packcolombia}
            nodePacksSalvador={model.nodes.packsalvador}
            nodePacksRugabano={model.nodes.packrugabano}
          />
        </CameraRig>
      </group>
      <group position={positions.cups.position} rotation={[0, Math.PI / 8, 0]}>
        <CameraRig>
          <Physics>
            <CupsModel
              nodeTable={model.nodes.tablecups}
              nodeCups={model.nodes.cups}
              beansPosition={positions.beans.position}
            />
          </Physics>
        </CameraRig>
      </group>

      <group position={positions.table.position} rotation={[0, 0, 0]}>
        <CoffeTableModel
          nodeTable={model.nodes.coftable}
          nodeFlower={model.nodes.flower}
        />
      </group>
    </group>
  );
};

export default Models;
