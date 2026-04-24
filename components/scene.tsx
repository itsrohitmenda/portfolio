"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import type { Group, Mesh } from "three";
import type { MotionValue } from "framer-motion";
import { useScroll } from "framer-motion";

type Scroll = MotionValue<number>;

const PALETTE = {
  cream: "#FFF3EA",
  ink: "#1C120E",
  sun: "#FFD24A",
  iris: "#4AD6D6",
  hot: "#FF5ACD",
  sky: "#4A9EFF",
  acid: "#C3F53E",
  coral: "#F56B4A",
};

// Spinning gear — torus with segments
function Gear({
  position,
  rotation = [0, 0, 0],
  color,
  radius = 0.6,
  tube = 0.14,
  speed = 1,
  direction = 1,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  radius?: number;
  tube?: number;
  speed?: number;
  direction?: 1 | -1;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed * direction;
  });
  const teeth = 8;
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, tube, 14, 36]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Gear teeth */}
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (i / teeth) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[tube * 1.8, tube * 1.3, tube * 1.7]} />
            <meshToonMaterial color={color} />
          </mesh>
        );
      })}
      {/* Hub */}
      <mesh>
        <cylinderGeometry args={[tube * 1.1, tube * 1.1, tube * 2.2, 16]} />
        <meshToonMaterial color={PALETTE.ink} />
      </mesh>
    </group>
  );
}

// Ticking arm — rotates around a center
function TickingArm({
  position,
  length = 1.2,
  color,
  tipColor,
  speed = 0.8,
}: {
  position: [number, number, number];
  length?: number;
  color: string;
  tipColor: string;
  speed?: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
        <meshToonMaterial color={PALETTE.ink} />
      </mesh>
      <group ref={ref}>
        <mesh position={[length / 2, 0, 0]}>
          <boxGeometry args={[length, 0.08, 0.08]} />
          <meshToonMaterial color={color} />
        </mesh>
        <mesh position={[length, 0, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshToonMaterial color={tipColor} />
        </mesh>
      </group>
    </group>
  );
}

// Piston — cylinder that pumps up-down
function Piston({
  position,
  color,
  offset = 0,
}: {
  position: [number, number, number];
  color: string;
  offset?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        Math.sin(state.clock.elapsedTime * 2 + offset) * 0.15;
    }
  });
  return (
    <group position={position}>
      {/* Housing */}
      <mesh>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshToonMaterial color={PALETTE.cream} />
      </mesh>
      {/* Plunger */}
      <mesh ref={ref} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshToonMaterial color={PALETTE.ink} />
      </mesh>
    </group>
  );
}

// Little screen with color glow
function Screen({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as any;
      if (mat?.emissiveIntensity !== undefined) {
        mat.emissiveIntensity =
          0.55 + Math.sin(state.clock.elapsedTime * 3) * 0.25;
      }
    }
  });
  return (
    <group position={position} rotation={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.55, 0.4, 0.08]} />
        <meshToonMaterial color={PALETTE.ink} />
      </mesh>
      <mesh ref={ref} position={[0, 0, 0.045]}>
        <planeGeometry args={[0.42, 0.28]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
        />
      </mesh>
    </group>
  );
}

// The full contraption — a playful isometric machine
function Contraption({ scrollYProgress }: { scrollYProgress: Scroll }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollYProgress.get();
    // Gentle drift + scroll-driven sink
    group.current.rotation.y = Math.sin(t * 0.25) * 0.2 + scroll * 0.4;
    group.current.position.y = Math.sin(t * 0.4) * 0.12 - scroll * 2.2;
  });

  return (
    <group ref={group} rotation={[-0.25, 0.4, 0]}>
      <Float speed={0.8} floatIntensity={0.4} rotationIntensity={0}>
        {/* Main body — stacked boxes */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[2.4, 1.2, 1.6]} />
          <meshToonMaterial color={PALETTE.cream} />
        </mesh>
        <mesh position={[0, -0.4, 0.81]}>
          <planeGeometry args={[2.38, 1.18]} />
          <meshToonMaterial color={PALETTE.cream} />
        </mesh>
        {/* Side panel — colored */}
        <mesh position={[-1.21, -0.4, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.6, 1.2]} />
          <meshToonMaterial color={PALETTE.sky} />
        </mesh>
        <mesh position={[1.21, -0.4, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.6, 1.2]} />
          <meshToonMaterial color={PALETTE.hot} />
        </mesh>

        {/* Top deck */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2.2, 0.2, 1.4]} />
          <meshToonMaterial color={PALETTE.ink} />
        </mesh>

        {/* Gear on top-left */}
        <Gear
          position={[-0.75, 0.75, 0.35]}
          color={PALETTE.sun}
          radius={0.38}
          tube={0.07}
          speed={0.9}
        />
        {/* Smaller interlocking gear */}
        <Gear
          position={[-0.2, 0.8, 0.35]}
          color={PALETTE.acid}
          radius={0.22}
          tube={0.06}
          speed={1.4}
          direction={-1}
        />

        {/* Ticking arm top-right */}
        <TickingArm
          position={[0.7, 0.55, 0.4]}
          length={0.55}
          color={PALETTE.ink}
          tipColor={PALETTE.iris}
          speed={0.9}
        />

        {/* Piston cluster — back */}
        <Piston position={[-0.5, 0.55, -0.45]} color={PALETTE.hot} offset={0} />
        <Piston
          position={[0, 0.55, -0.45]}
          color={PALETTE.sun}
          offset={Math.PI / 2}
        />
        <Piston
          position={[0.5, 0.55, -0.45]}
          color={PALETTE.iris}
          offset={Math.PI}
        />

        {/* Front screen */}
        <Screen position={[0, -0.4, 0.86]} color={PALETTE.acid} />

        {/* Knobs — front row */}
        {[-0.85, -0.45, 0.45, 0.85].map((x, i) => (
          <mesh key={i} position={[x, -0.85, 0.86]}>
            <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
            <meshToonMaterial
              color={[PALETTE.hot, PALETTE.sun, PALETTE.iris, PALETTE.acid][i]}
            />
          </mesh>
        ))}

        {/* Antenna */}
        <group position={[1.0, 0.9, 0]}>
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 0.9, 8]} />
            <meshToonMaterial color={PALETTE.ink} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshToonMaterial color={PALETTE.sun} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Orbiters({ scrollYProgress }: { scrollYProgress: Scroll }) {
  const group = useRef<Group>(null);

  const satellites = useMemo(
    () => [
      {
        pos: [3.2, 1.4, 0] as [number, number, number],
        color: PALETTE.acid,
        size: 0.16,
        shape: "box" as const,
      },
      {
        pos: [-3.2, -0.4, 0.4] as [number, number, number],
        color: PALETTE.hot,
        size: 0.13,
        shape: "sphere" as const,
      },
      {
        pos: [2.4, -1.6, 0.6] as [number, number, number],
        color: PALETTE.iris,
        size: 0.18,
        shape: "torus" as const,
      },
      {
        pos: [-2.6, 1.8, -0.2] as [number, number, number],
        color: PALETTE.sun,
        size: 0.15,
        shape: "box" as const,
      },
    ],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollYProgress.get();
    group.current.rotation.y = t * 0.08 + scroll * Math.PI * 0.5;
    group.current.position.y = -scroll * 1.5;
  });

  return (
    <group ref={group}>
      {satellites.map((s, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.3}
          rotationIntensity={1.2}
          floatIntensity={1}
        >
          <mesh position={s.pos}>
            {s.shape === "box" && <boxGeometry args={[s.size, s.size, s.size]} />}
            {s.shape === "sphere" && <sphereGeometry args={[s.size, 16, 16]} />}
            {s.shape === "torus" && (
              <torusGeometry args={[s.size, s.size * 0.35, 10, 20]} />
            )}
            <meshToonMaterial color={s.color} />
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
      camera={{ position: [0, 0.4, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} color="#FFFFFF" />
      <directionalLight position={[-4, 2, 3]} intensity={0.6} color="#FFD24A" />
      <pointLight position={[2, -3, 2]} intensity={0.5} color="#FF5ACD" />
      <Suspense fallback={null}>
        <Contraption scrollYProgress={scrollYProgress} />
        <Orbiters scrollYProgress={scrollYProgress} />
      </Suspense>
    </Canvas>
  );
}
