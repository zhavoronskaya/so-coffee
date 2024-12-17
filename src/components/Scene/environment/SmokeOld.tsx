import { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import React from "react";

import smokeVertexShader from "./shaders/OldSmokevertex";
import smokeFragmentShader from "./shaders/OldSmokefragment";

import { useThree, useFrame } from "@react-three/fiber";
import {
  DoubleSide,
  PlaneGeometry,
  RepeatWrapping,
  ShaderMaterial,
  Uniform,
  Vector2,
} from "three";

function Smoke() {
  const shaderRef = useRef<ShaderMaterial | null>(null);
  const geomertyRef = useRef<PlaneGeometry | null>(null);
  const { viewport } = useThree();

  const smokeTexture = useTexture("/textures/perlin.png");

  smokeTexture.wrapS = RepeatWrapping;
  smokeTexture.wrapT = RepeatWrapping;

  const uniforms = useRef({
    uTime: new Uniform(0),
    uResolution: new Uniform(new Vector2(1, viewport.height / viewport.width)),
    uSmokeTexture: new Uniform(smokeTexture),
  });
  useEffect(() => {
    geomertyRef.current?.translate(0, 0.5, 0);
  }, []);
  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.4;
      shaderRef.current.uniforms.uResolution.value = new Vector2(
        1,
        viewport.height / viewport.width
      );
    }
  });

  return (
    <mesh
      scale={[2.3, 8, 2.3]}
      position={[0, 1.5, 0]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <planeGeometry ref={geomertyRef} args={[1, 1, 16, 64]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={smokeVertexShader}
        fragmentShader={smokeFragmentShader}
        uniforms={uniforms.current}
        side={DoubleSide}
        transparent={true}
        depthWrite={false}
      />
      {/* <meshBasicMaterial color={"red"} wireframe /> */}
    </mesh>
  );
}

export default Smoke;
