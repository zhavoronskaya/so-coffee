import { Vector3 } from "three";

export const CAMERA_POSITIONINGS_MAP = {
  default: {
    id: "default",
    position: new Vector3(0, 0, 10),
    target: new Vector3(0, 0, 0),
    offsetX: 0,
  },
  tree: {
    id: "tree",
    position: new Vector3(0, -18, 16),
    target: new Vector3(0, -18, 0),
    offsetX: 190,
  },
  packs: {
    id: "packs",
    position: new Vector3(0, -34, 22),
    target: new Vector3(0, -38, 0),
    offsetX: -300,
  },

  cups: {
    id: "cups",
    position: new Vector3(0, -64, 22),
    target: new Vector3(0, -66, 0),
    offsetX: 350,
  },

  table: {
    id: "table",
    position: new Vector3(0, -104, 14),
    target: new Vector3(0, -105, 0),
    offsetX: -280,
  },
  maps: {
    id: "maps",
    position: new Vector3(0, -108, 14),
    target: new Vector3(-15, -109, 0),

    offsetX: -280,
  },
};

export const CAMERA_POSITIONINGS_MAP_TOUCH_SCREEN = {
  default: {
    id: "default",
    position: new Vector3(0.2, 0, 16),
    target: new Vector3(0.2, 0, 0),
    offsetX: 0,
  },
  tree: {
    id: "tree",
    position: new Vector3(-4, -30, 0),
    target: new Vector3(-4, -28, -10),
    offsetX: 0,
  },
  packs: {
    id: "packs",
    position: new Vector3(0, -50, -10),
    target: new Vector3(0, -54, -20),
    offsetX: 0,
  },
  cups: {
    id: "cups",
    position: new Vector3(0, -108, -6),
    target: new Vector3(0, -112, -26),
    offsetX: 0,
  },

  table: {
    id: "table",
    position: new Vector3(0, -138, -10),
    target: new Vector3(0, -142, -20),
    offsetX: 0,
  },
  maps: {
    id: "maps",
    position: new Vector3(0, -138, -10),
    target: new Vector3(-5, -142, -20),
    offsetX: 0,
  },
};
