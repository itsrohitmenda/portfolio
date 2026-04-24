"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Edges } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import type { Group } from "three";
import type { MotionValue } from "framer-motion";
import { useScroll } from "framer-motion";

type Scroll = MotionValue<number>;
type MouseRef = React.RefObject<{ x: number; y: number }>;

const PALETTE = {
  pink: "#FF3E9D",
  cherry: "#FF4D4D",
  lime: "#BFFF3D",
  sky: "#7AB9FF",
  sun: "#FFC22E",
  iris: "#B8A8FF",
  cream: "#FFFBEA",
  ink: "#171412",
};

// ---- Shape geometries (memoized) ----

function useHeartGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.25);
    s.bezierCurveTo(0, 0.6, 0.6, 0.8, 0.6, 0.2);
    s.bezierCurveTo(0.6, -0.2, 0, -0.5, 0, -0.8);
    s.bezierCurveTo(0, -0.5, -0.6, -0.2, -0.6, 0.2);
    s.bezierCurveTo(-0.6, 0.8, 0, 0.6, 0, 0.25);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 6,
    });
    g.center();
    return g;
  }, []);
}

function useStarGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    const points = 5;
    const outer = 0.75;
    const inner = 0.34;
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 5,
    });
    g.center();
    return g;
  }, []);
}

function usePlusGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    const t = 0.24;
    const r = 0.65;
    s.moveTo(-t, r);
    s.lineTo(t, r);
    s.lineTo(t, t);
    s.lineTo(r, t);
    s.lineTo(r, -t);
    s.lineTo(t, -t);
    s.lineTo(t, -r);
    s.lineTo(-t, -r);
    s.lineTo(-t, -t);
    s.lineTo(-r, -t);
    s.lineTo(-r, t);
    s.lineTo(-t, t);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.07,
      bevelSegments: 4,
    });
    g.center();
    return g;
  }, []);
}

// ---- Individual sticker components ----

function SmileySun() {
  const rays = Array.from({ length: 10 });
  return (
    <group>
      {rays.map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.95, Math.sin(a) * 0.95, 0]}
            rotation={[0, 0, a]}
          >
            <boxGeometry args={[0.26, 0.14, 0.2]} />
            <meshToonMaterial color={PALETTE.sun} />
            <Edges threshold={15} color={PALETTE.ink} />
          </mesh>
        );
      })}
      {/* Face disc */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshToonMaterial color={PALETTE.sun} />
        <Edges threshold={15} color={PALETTE.ink} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.22, 0.12, 0.63]}>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshToonMaterial color={PALETTE.ink} />
      </mesh>
      <mesh position={[0.22, 0.12, 0.63]}>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshToonMaterial color={PALETTE.ink} />
      </mesh>
      {/* Smile: half-torus */}
      <mesh position={[0, -0.1, 0.62]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.18, 0.035, 14, 24, Math.PI]} />
        <meshToonMaterial color={PALETTE.ink} />
      </mesh>
    </group>
  );
}

function Pill({ color }: { color: string }) {
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <mesh>
        <capsuleGeometry args={[0.42, 0.95, 12, 28]} />
        <meshToonMaterial color={color} />
        <Edges threshold={15} color={PALETTE.ink} />
      </mesh>
      {/* Middle band */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.43, 0.025, 10, 36]} />
        <meshToonMaterial color={PALETTE.ink} />
      </mesh>
    </group>
  );
}

// ---- Sticker wrapper (handles scroll + mouse) ----

function Sticker({
  basePos,
  scroll,
  mouse,
  scrollBias = 1,
  floatSpeed = 1.4,
  floatIntensity = 0.5,
  parallax = 0.3,
  children,
}: {
  basePos: [number, number, number];
  scroll: Scroll;
  mouse: MouseRef;
  scrollBias?: number;
  floatSpeed?: number;
  floatIntensity?: number;
  parallax?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.get();
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;

    // Eased rotation: scroll drives spin, mouse nudges sideways
    const targetRy = t * 0.4 * scrollBias + s * Math.PI * 1.2 + mx * 0.4;
    const targetRx = Math.sin(t * 0.5) * 0.3 + my * 0.35 - s * 0.5;
    ref.current.rotation.y += (targetRy - ref.current.rotation.y) * 0.1;
    ref.current.rotation.x += (targetRx - ref.current.rotation.x) * 0.1;
    ref.current.rotation.z = Math.sin(t * 0.3 + basePos[0]) * 0.1;

    // Position drift + scroll sink + parallax
    ref.current.position.x = basePos[0] + mx * parallax;
    ref.current.position.y =
      basePos[1] + Math.sin(t * 0.6 + basePos[0]) * 0.12 - s * 2.2;
    ref.current.position.z = basePos[2] + my * parallax * 0.6;
  });

  return (
    <group ref={ref}>
      <Float
        speed={floatSpeed}
        rotationIntensity={0}
        floatIntensity={floatIntensity}
      >
        {children}
      </Float>
    </group>
  );
}

// ---- Scene composition ----

function Stickers({ scroll }: { scroll: Scroll }) {
  const group = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  const heart = useHeartGeometry();
  const star = useStarGeometry();
  const plus = usePlusGeometry();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      mq.removeEventListener("change", update);
    };
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y +=
      (mouse.current.x * 0.08 - group.current.rotation.y) * 0.04;
    group.current.rotation.x +=
      (mouse.current.y * 0.06 - group.current.rotation.x) * 0.04;
  });

  // Desktop: shrink so stickers frame the headline rather than fight it.
  // Mobile: keep them readable at a smaller canvas.
  const groupScale = isDesktop ? 0.58 : 0.8;

  return (
    <group ref={group} scale={groupScale}>
      {/* Hot-pink pill — far upper right, pushed out of the headline block */}
      <Sticker
        basePos={[3.1, 1.7, -0.2]}
        scroll={scroll}
        mouse={mouse}
        scrollBias={1.4}
        floatSpeed={1.6}
        floatIntensity={0.6}
      >
        <Pill color={PALETTE.pink} />
      </Sticker>

      {/* Smiley sun — far upper left */}
      <Sticker
        basePos={[-3.2, 1.9, 0.2]}
        scroll={scroll}
        mouse={mouse}
        scrollBias={0.7}
        floatSpeed={1.3}
        floatIntensity={0.55}
      >
        <SmileySun />
      </Sticker>

      {/* Lime puffy star — far lower right */}
      <Sticker
        basePos={[3.3, -1.6, 0.2]}
        scroll={scroll}
        mouse={mouse}
        scrollBias={1.9}
        floatSpeed={1.9}
        floatIntensity={0.75}
      >
        <mesh geometry={star}>
          <meshToonMaterial color={PALETTE.lime} />
          <Edges threshold={15} color={PALETTE.ink} />
        </mesh>
      </Sticker>

      {/* Cherry heart — far lower left */}
      <Sticker
        basePos={[-2.9, -1.4, 0.3]}
        scroll={scroll}
        mouse={mouse}
        scrollBias={1.2}
        floatSpeed={1.4}
        floatIntensity={0.6}
      >
        <mesh geometry={heart} rotation={[0, 0, Math.PI]}>
          <meshToonMaterial color={PALETTE.cherry} />
          <Edges threshold={15} color={PALETTE.ink} />
        </mesh>
      </Sticker>

      {/* Sky plus sign — bottom center, below the metric tiles area */}
      <Sticker
        basePos={[0.3, -2.6, 0.1]}
        scroll={scroll}
        mouse={mouse}
        scrollBias={2.2}
        floatSpeed={2.1}
        floatIntensity={0.45}
      >
        <mesh geometry={plus}>
          <meshToonMaterial color={PALETTE.sky} />
          <Edges threshold={15} color={PALETTE.ink} />
        </mesh>
      </Sticker>

      {/* Lavender orb — deep background, a soft anchor */}
      <Sticker
        basePos={[0, 0.2, -2.2]}
        scroll={scroll}
        mouse={mouse}
        scrollBias={0.5}
        floatSpeed={1.0}
        floatIntensity={0.3}
        parallax={0.15}
      >
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshToonMaterial color={PALETTE.iris} />
          <Edges threshold={15} color={PALETTE.ink} />
        </mesh>
      </Sticker>
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
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.25} color="#FFFFFF" />
      <directionalLight
        position={[-4, 2, 3]}
        intensity={0.55}
        color={PALETTE.sun}
      />
      <pointLight position={[2, -3, 2]} intensity={0.45} color={PALETTE.pink} />
      <Suspense fallback={null}>
        <Stickers scroll={scrollYProgress} />
      </Suspense>
    </Canvas>
  );
}
