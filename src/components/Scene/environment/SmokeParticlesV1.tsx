import { useFrame } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";

import pointsVertexShader from "./shaders/smokeParticlesVertex";
import pointsFragmentShader from "./shaders/smokeParticlesFragment";
import { useTexture } from "@react-three/drei";

const particlesCount = 100;
const color = new THREE.Color();
const GRAVITY = new THREE.Vector3(0, -9.8, 0);
function Smoke() {
  const pointsRef = useRef<THREE.Points | null>(null);
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const smokeTexture = useTexture("/textures/smoke.png");
  smokeTexture.minFilter = THREE.LinearFilter;
  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uTexture: new THREE.Uniform(smokeTexture),
  });
  const particlesGeometry = useMemo(() => {
    const particles = [];
    const positions = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);
    const alphas = new Float32Array(particlesCount);
    const sizes = new Float32Array(particlesCount);
    const angles = new Float32Array(particlesCount);

    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const x = (Math.random() * 2 - 1) * 0.8;
      const y = Math.random() * 8.5;
      const z = (Math.random() * 2 - 1) * 0.8;
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      speeds[i] = 0.5 + Math.random() * 4.2;
      sizes[i] = 10 + (i % 10);
      angles[i] = Math.PI * ((i % 10) / 5);
      alphas[i] = 10 + (i % 10);
      const c = color.setHSL(Math.random(), 1, 0.5);
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      const dir = new THREE.Vector3(x, y, z).normalize();

      particles.push({
        life: 0,
        maxLife: 4,
        alpha: 1,
        size: sizes[i],
        angle: angles[i],
        color: colors[i],
        position: new THREE.Vector3(x, y, z),
        velocity: dir.multiplyScalar(2),
      });
    }

    const geometry = new THREE.BufferGeometry() as THREE.BufferGeometry;
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aAngle", new THREE.BufferAttribute(angles, 1));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    //@ts-expect-error ts error
    geometry.attributes.position.setUsage(THREE.DynamicDrawUsage);
    //@ts-expect-error ts error
    geometry.attributes.aSize.setUsage(THREE.DynamicDrawUsage);
    //@ts-expect-error ts error
    geometry.attributes.aAlpha.setUsage(THREE.DynamicDrawUsage);
    //@ts-expect-error ts error
    geometry.attributes.aAlpha.setUsage(THREE.DynamicDrawUsage);
    //@ts-expect-error ts error
    geometry.attributes.aColor.setUsage(THREE.DynamicDrawUsage);
    return { geometry, particles };
  }, [particlesCount]);

  useFrame((state, delta) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value += 0.0 * delta;
    shaderRef.current.needsUpdate = true;
    if (!pointsRef.current) return;
    if (!pointsRef.current.geometry) return;
    const positions = [];
    const sizes = [];
    const angles = [];
    const alphas = [];

    // console.log(pointsRef.current);

    for (let i = 0; i < particlesCount; ++i) {
      const p = particlesGeometry.particles[i];

      p.life += delta;
      p.life = Math.min(p.life, p.maxLife);

      p.angle += delta;

      // Update position based on velocity and gravity
      const forces = GRAVITY.clone();
      const DRAG = -0.5;
      forces.add(p.velocity.clone().multiplyScalar(DRAG));

      // p.velocity.add(forces.multiplyScalar(delta));

      // const displacement = p.velocity.clone().multiplyScalar(delta);
      // p.position.add(displacement);

      if (p.life < 1) {
        p.alpha = p.life;
      } else if (p.life > p.maxLife - 1) {
        p.alpha = p.maxLife - p.life;
      }

      positions.push(p.position.x, p.position.y, p.position.z);
      sizes.push(p.size);
      angles.push(p.angle);
      alphas.push(p.alpha);
    }

    pointsRef.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    pointsRef.current.geometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(sizes, 1)
    );
    pointsRef.current.geometry.setAttribute(
      "angle",
      new THREE.Float32BufferAttribute(angles, 1)
    );
    pointsRef.current.geometry.setAttribute(
      "alpha",
      new THREE.Float32BufferAttribute(alphas, 1)
    );

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
    pointsRef.current.geometry.attributes.angle.needsUpdate = true;
    pointsRef.current.geometry.attributes.alpha.needsUpdate = true;
  });
  return (
    <points
      ref={pointsRef}
      position={[0, 2, 0]}
      geometry={particlesGeometry.geometry}
    >
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
}
export default Smoke;
