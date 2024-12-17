import { Material, MeshBasicMaterial, ShaderMaterial } from "three";

export function isMaterial(
  material: Material | Material[]
): material is Material {
  return !Array.isArray(material);
}

export function isBasicMaterial(
  material: Material | Material[]
): material is MeshBasicMaterial {
  return material instanceof MeshBasicMaterial;
}

export function isShaderMaterial(
  material: Material | Material[]
): material is ShaderMaterial {
  return material instanceof ShaderMaterial;
}
