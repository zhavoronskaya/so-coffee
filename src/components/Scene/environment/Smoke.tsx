import { createPortal, useFrame } from "@react-three/fiber";
import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFBO } from "@react-three/drei";
import pointsVertexShader from "./shaders/smokeParticlesVertex";
import pointsFragmentShader from "./shaders/smokeParticlesFragment";
import simulationVertexShader from "./shaders/simulationVertex";
import simulationFragmentShader from "./shaders/simulationFragment";
import { useTexture } from "@react-three/drei";
import { isShaderMaterial } from "../helpers/Material";

const getRandomData = (width: number, height: number) => {
  const length = width * height * 4;
  const data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const i1 = i * 4;

    const x = (Math.random() * 2 - 1) * 0.4;
    const y = Math.random() * 4.5;
    const z = (Math.random() * 2 - 1) * 0.4;
    data[i1] = x;
    data[i1 + 1] = y;
    data[i1 + 2] = z;
    data[i1 + 3] = 1.0; // this value will not have any impact
  }

  const dataTexture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
};

const SIZE = 12;
const positionsTexture = getRandomData(SIZE, SIZE);
const scene = new THREE.Scene();
const cameraFBO = new THREE.OrthographicCamera(
  -1,
  1,
  1,
  -1,
  1 / Math.pow(2, 53),
  1
);
const positions = new Float32Array([
  -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
]);
const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

function Smoke() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const simulationMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const simUniforms = useRef({
    uTime: new THREE.Uniform(0),
    positions: new THREE.Uniform(positionsTexture),
  });
  const renderTarget = useFBO(SIZE, SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });
  useEffect(() => {
    if (!pointsRef.current) return;
    pointsRef.current.frustumCulled = false;
  }, []);

  useFrame((state, delta) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, cameraFBO);
    gl.setRenderTarget(null);

    if (pointsRef.current) {
      if (!isShaderMaterial(pointsRef.current.material)) return;

      pointsRef.current.material.uniforms.uPositions.value =
        renderTarget.texture;
      pointsRef.current.material.uniforms.uTime.value += delta * 0.3;
    }

    if (simulationMaterialRef.current)
      simulationMaterialRef.current.uniforms.uTime.value =
        clock.elapsedTime * 0.3;
  });

  return (
    <>
      {createPortal(
        <mesh>
          <shaderMaterial
            ref={simulationMaterialRef}
            fragmentShader={simulationFragmentShader}
            vertexShader={simulationVertexShader}
            uniforms={simUniforms.current}
          />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <Points pointsRef={pointsRef} shaderRef={shaderRef} />
    </>
  );
}

type PointsProps = {
  pointsRef: React.MutableRefObject<THREE.Points | null>;
  shaderRef: React.MutableRefObject<THREE.ShaderMaterial | null>;
};
const Points = React.memo(
  function Points({ pointsRef, shaderRef }: PointsProps) {
    const smokeTexture = useTexture("/textures/smoke.png");
    smokeTexture.minFilter = THREE.LinearFilter;
    const uniforms = useRef({
      uTime: new THREE.Uniform(0),
      uPositions: { value: null },
      uTexture: new THREE.Uniform(smokeTexture),
    });

    const particlesGeometry = useMemo(() => {
      const particlesCount = SIZE * SIZE;
      const positions = new Float32Array(particlesCount * 3);
      const alphas = new Float32Array(particlesCount);
      const sizes = new Float32Array(particlesCount);
      const angles = new Float32Array(particlesCount);

      for (let i = 0; i < particlesCount; i++) {
        const x = (i % SIZE) / SIZE;
        const y = i / SIZE / SIZE;
        const z = 0;

        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        sizes[i] = 20 + Math.random() * 30;
        angles[i] = Math.PI * ((i % 10) / 5);
        alphas[i] = 1;
      }

      const geometry = new THREE.BufferGeometry() as THREE.BufferGeometry;
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("aAngle", new THREE.BufferAttribute(angles, 1));
      geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));

      return { geometry };
    }, []);
    return (
      <points
        ref={pointsRef}
        position={[0, 2, 0]}
        geometry={particlesGeometry.geometry}
      >
        <shaderMaterial
          blending={THREE.NormalBlending}
          depthWrite={false}
          ref={shaderRef}
          transparent={true}
          uniforms={uniforms.current}
          side={THREE.DoubleSide}
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
          alphaTest={0}
        />
      </points>
    );
  },
  () => true
);
export default Smoke;
