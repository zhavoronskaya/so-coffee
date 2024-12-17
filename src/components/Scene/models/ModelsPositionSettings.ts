import { Vector3 } from "three";

export const MODELS_POSITIONINGS_MAP = {
  tree: {
    id: "tree",
    position: new Vector3(0, -17, 0),
  },
  packs: {
    id: "packs",
    position: new Vector3(0, -44, 0),
  },
  cups: {
    id: "cups",
    position: new Vector3(0, -72, 0),
  },
  beans: {
    id: "beans",
    position: new Vector3(-3, 4, 0),
  },

  table: {
    id: "table",
    position: new Vector3(0, -108, 0),
  },
};

export const MODELS_POSITIONINGS_MAP_TOUCH_SCREEN = {
  tree: {
    id: "tree",
    position: new Vector3(-2, -22, -14),
  },
  packs: {
    id: "packs",
    position: new Vector3(0, -74, -50),
  },
  cups: {
    id: "cups",
    position: new Vector3(0, -120, -40),
  },
  beans: {
    id: "beans",
    position: new Vector3(-5, 4, 0),
  },

  table: {
    id: "table",
    position: new Vector3(0, -155, -30),
  },
};
