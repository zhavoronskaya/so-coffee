import { useFrame } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";

import pointsVertexShader from "./shaders/particlesVertex";
import pointsFragmentShader from "./shaders/particlesFragment";

function Particles() {
  const pointsRef = useRef<THREE.Points | null>(null);
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state, delta) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value += 0.1 * delta;
    shaderRef.current.needsUpdate = true;
  });

  return (
    <>
      <Points pointsRef={pointsRef} shaderRef={shaderRef} />
    </>
  );
}

type PointsProps = {
  pointsRef: React.MutableRefObject<THREE.Points | null>;
  shaderRef: React.MutableRefObject<THREE.ShaderMaterial | null>;
};
const particlesCount = 20;
const Points = React.memo(
  function Points({ pointsRef, shaderRef }: PointsProps) {
    const uniforms = useRef({
      uTime: new THREE.Uniform(0),
      uColor: new THREE.Uniform(new THREE.Color("#72B4CC")),
    });

    const particlesGeometry = useMemo(() => {
      const positions = new Float32Array(particlesCount * 3);
      const speeds = new Float32Array(particlesCount);
      const sizes = new Float32Array(particlesCount);

      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 30.5;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10.5;

        speeds[i] = 0.5 + Math.random() * 4.2;
        sizes[i] = Math.random() * 10 + 200;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
      geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      return geometry;
    }, [particlesCount]);

    return (
      <points ref={pointsRef} position={[0, 6, 0]} geometry={particlesGeometry}>
        <shaderMaterial
          ref={shaderRef}
          transparent={true}
          uniforms={uniforms.current}
          depthWrite={false}
          side={THREE.DoubleSide}
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
        />
      </points>
    );
  },
  () => true
);

export default Particles;
