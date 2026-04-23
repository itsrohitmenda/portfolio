"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

type Shape = "torus" | "box" | "icosa" | "octa" | "ring";

function Shape({ shape, color }: { shape: Shape; color: string }) {
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.3;
    mesh.current.rotation.x += delta * 0.15;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.4}>
      <mesh ref={mesh}>
        {shape === "torus" && <torusKnotGeometry args={[0.7, 0.22, 128, 24]} />}
        {shape === "box" && <boxGeometry args={[1.1, 1.1, 1.1]} />}
        {shape === "icosa" && <icosahedronGeometry args={[0.95, 0]} />}
        {shape === "octa" && <octahedronGeometry args={[1, 0]} />}
        {shape === "ring" && <torusGeometry args={[0.9, 0.2, 24, 100]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingObject({
  shape = "icosa",
  color = "#BFFF1A",
}: {
  shape?: Shape;
  color?: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} color="#F4F2EC" />
      <pointLight position={[-2, -1, -1]} intensity={1.2} color={color} />
      <Suspense fallback={null}>
        <Shape shape={shape} color={color} />
      </Suspense>
    </Canvas>
  );
}
