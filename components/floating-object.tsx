"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Edges } from "@react-three/drei";
import { useRef, Suspense, useEffect } from "react";
import type { Mesh, Group } from "three";

type Shape = "torus" | "box" | "icosa" | "octa" | "ring";

function Body({ shape, color }: { shape: Shape; color: string }) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);

  // Scroll-linked rotation — reads window.scrollY directly inside the frame loop
  // so every FloatingObject in the page responds to scroll, no matter its container.
  const scroll = useRef({ y: 0, last: 0, velocity: 0 });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      scroll.current.y = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((_, delta) => {
    // Scroll velocity feeds rotation — the object spins while you scroll,
    // then eases back to a gentle idle rotation when you stop.
    const velocity = scroll.current.y - scroll.current.last;
    scroll.current.last = scroll.current.y;
    scroll.current.velocity = scroll.current.velocity * 0.9 + velocity * 0.1;

    if (mesh.current) {
      mesh.current.rotation.y +=
        delta * 0.35 + scroll.current.velocity * 0.01;
      mesh.current.rotation.x +=
        delta * 0.18 + scroll.current.velocity * 0.004;
    }
    if (group.current) {
      group.current.rotation.z +=
        delta * 0.1 + scroll.current.velocity * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={group}>
        <mesh ref={mesh}>
          {shape === "torus" && (
            <torusKnotGeometry args={[0.7, 0.22, 128, 24]} />
          )}
          {shape === "box" && <boxGeometry args={[1.1, 1.1, 1.1]} />}
          {shape === "icosa" && <icosahedronGeometry args={[0.95, 0]} />}
          {shape === "octa" && <octahedronGeometry args={[1, 0]} />}
          {shape === "ring" && <torusGeometry args={[0.9, 0.2, 24, 64]} />}
          <meshToonMaterial color={color} />
          {/* Crisp silhouette edges for sharpness */}
          <Edges threshold={15} color="#171412" />
        </mesh>
        {/* Contrast outline ring for playful depth */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.25, 0.04, 10, 64]} />
          <meshToonMaterial color="#171412" />
        </mesh>
      </group>
    </Float>
  );
}

export default function FloatingObject({
  shape = "icosa",
  color = "#FFC22E",
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
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 3]} intensity={1.3} color="#FFFFFF" />
      <directionalLight position={[-3, 1, 2]} intensity={0.55} color="#FFC22E" />
      <Suspense fallback={null}>
        <Body shape={shape} color={color} />
      </Suspense>
    </Canvas>
  );
}
