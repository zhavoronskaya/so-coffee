import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

export default function useModelTexture(url: string) {
  const texture = useTexture(url);
  texture.flipY = false;
  texture.colorSpace = SRGBColorSpace;

  return texture;
}
