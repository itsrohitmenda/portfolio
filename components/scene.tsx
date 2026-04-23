"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import type { Mesh, Group } from "three";
import type { MotionValue } from "framer-motion";
import { useScroll } from "framer-motion";

type Scroll = MotionValue<number>;

function Blob({ scrollYProgress }: { scrollYProgress: Scroll }) {
  const mesh = useRef<Mesh>(null);
  const matRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const scroll = scrollYProgress.get();
    mesh.current.rotation.y += delta * 0.2;
    mesh.current.rotation.x += delta * 0.07;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 - scroll * 1.8;
    mesh.current.scale.setScalar(1 + scroll * 0.5);

    if (matRef.current) {
      matRef.current.distort = 0.35 + scroll * 0.5;
      matRef.current.speed = 2 + scroll * 4;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.6, 64]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#7C5CFF"
          distort={0.35}
          speed={2}
          roughness={0.15}
          metalness={0.85}
          emissive="#7C5CFF"
          emissiveIntensity={0.18}
        />
      </mesh>
    </Float>
  );
}

function Satellites({ scrollYProgress }: { scrollYProgress: Scroll }) {
  const group = useRef<Group>(null);

  const satellites = useMemo(
    () => [
      { pos: [2.6, 0.8, -0.5] as [number, number, number], color: "#BFFF1A", size: 0.18 },
      { pos: [-2.4, -0.6, 0.4] as [number, number, number], color: "#FF4D2E", size: 0.12 },
      { pos: [1.8, -1.4, 0.6] as [number, number, number], color: "#8EFFE9", size: 0.14 },
      { pos: [-2.8, 1.2, -0.2] as [number, number, number], color: "#F4F2EC", size: 0.1 },
    ],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollYProgress.get();
    group.current.rotation.y = t * 0.08 + scroll * Math.PI;
    group.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={group}>
      {satellites.map((s, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={1} floatIntensity={1.2}>
          <mesh position={s.pos}>
            <icosahedronGeometry args={[s.size, 2]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.8}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Scene({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#F4F2EC" />
      <pointLight position={[-3, -2, -2]} intensity={1.5} color="#7C5CFF" />
      <pointLight position={[3, 3, 2]} intensity={0.8} color="#BFFF1A" />
      <Suspense fallback={null}>
        <Environment preset="night" />
        <Blob scrollYProgress={scrollYProgress} />
        <Satellites scrollYProgress={scrollYProgress} />
      </Suspense>
    </Canvas>
  );
}
