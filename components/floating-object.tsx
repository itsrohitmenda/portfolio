"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh, Group } from "three";

type Shape = "torus" | "box" | "icosa" | "octa" | "ring";

function Body({ shape, color }: { shape: Shape; color: string }) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.35;
      mesh.current.rotation.x += delta * 0.18;
    }
    if (group.current) {
      group.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={group}>
        <mesh ref={mesh}>
          {shape === "torus" && (
            <torusKnotGeometry args={[0.7, 0.22, 96, 20]} />
          )}
          {shape === "box" && <boxGeometry args={[1.1, 1.1, 1.1]} />}
          {shape === "icosa" && <icosahedronGeometry args={[0.95, 0]} />}
          {shape === "octa" && <octahedronGeometry args={[1, 0]} />}
          {shape === "ring" && <torusGeometry args={[0.9, 0.2, 20, 64]} />}
          <meshToonMaterial color={color} />
        </mesh>
        {/* Contrast outline ring for playful depth */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.03, 8, 48]} />
          <meshToonMaterial color="#1C120E" />
        </mesh>
      </group>
    </Float>
  );
}

export default function FloatingObject({
  shape = "icosa",
  color = "#FFD24A",
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
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[-3, 1, 2]} intensity={0.5} color="#FFD24A" />
      <Suspense fallback={null}>
        <Body shape={shape} color={color} />
      </Suspense>
    </Canvas>
  );
}
