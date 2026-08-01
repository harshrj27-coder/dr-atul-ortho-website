"use client";

/**
 * Procedural interactive 3D joint map, built entirely from Three.js
 * primitives (spheres + cylinders) — no external .glb model dependency.
 * This keeps the "AI-powered rotating skeleton" feature fully self-contained
 * and dependency-free. Swap in a real rigged GLB model later by replacing
 * the contents of <SkeletonModel /> — the hover/click info-panel system
 * (JointNode) will keep working as long as you keep a mesh at each joint.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { jointInfo, type JointKey } from "@/data/joints";

const JOINT_POSITIONS: Record<JointKey, [number, number, number]> = {
  neck: [0, 2.55, 0],
  "shoulder-l": [-0.68, 2.25, 0],
  "shoulder-r": [0.68, 2.25, 0],
  "elbow-l": [-0.98, 1.45, 0.05],
  "elbow-r": [0.98, 1.45, 0.05],
  "wrist-l": [-1.12, 0.68, 0.1],
  "wrist-r": [1.12, 0.68, 0.1],
  spine: [0, 1.55, -0.05],
  hip: [0, 0.85, 0],
  "knee-l": [-0.34, -0.35, 0.05],
  "knee-r": [0.34, -0.35, 0.05],
  "ankle-l": [-0.38, -1.55, 0.05],
  "ankle-r": [0.38, -1.55, 0.05],
  "foot-l": [-0.4, -1.72, 0.28],
  "foot-r": [0.4, -1.72, 0.28],
};

const BONES: [[number, number, number], JointKey][] = [
  [[0, 3.0, 0], "neck"],
  [JOINT_POSITIONS.neck, "spine"],
  [JOINT_POSITIONS.spine, "hip"],
  [JOINT_POSITIONS.neck, "shoulder-l"],
  [JOINT_POSITIONS.neck, "shoulder-r"],
  [JOINT_POSITIONS["shoulder-l"], "elbow-l"],
  [JOINT_POSITIONS["elbow-l"], "wrist-l"],
  [JOINT_POSITIONS["shoulder-r"], "elbow-r"],
  [JOINT_POSITIONS["elbow-r"], "wrist-r"],
  [JOINT_POSITIONS.hip, "knee-l"],
  [JOINT_POSITIONS["knee-l"], "ankle-l"],
  [JOINT_POSITIONS["ankle-l"], "foot-l"],
  [JOINT_POSITIONS.hip, "knee-r"],
  [JOINT_POSITIONS["knee-r"], "ankle-r"],
  [JOINT_POSITIONS["ankle-r"], "foot-r"],
];

function Bone({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const { position, quaternion, length } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    return { position: mid, quaternion: quat, length: len };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion} castShadow>
      <cylinderGeometry args={[0.045, 0.06, length, 12]} />
      <meshPhysicalMaterial
        color="#eef2f8"
        metalness={0.15}
        roughness={0.35}
        clearcoat={0.6}
        clearcoatRoughness={0.25}
      />
    </mesh>
  );
}

function JointNode({
  jointKey,
  position,
  active,
  onHover,
}: {
  jointKey: JointKey;
  position: [number, number, number];
  active: JointKey | null;
  onHover: (key: JointKey | null) => void;
}) {
  const isActive = active === jointKey;
  const info = jointInfo[jointKey];

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onHover(jointKey);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[isActive ? 0.11 : 0.085, 24, 24]} />
        <meshPhysicalMaterial
          color={isActive ? "#D4AF37" : "#0057D9"}
          emissive={isActive ? "#D4AF37" : "#0057D9"}
          emissiveIntensity={isActive ? 1.1 : 0.35}
          metalness={0.4}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      {isActive && (
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.18} />
        </mesh>
      )}

      {isActive && (
        <Html distanceFactor={6} position={[0.25, 0.15, 0]} occlude={false}>
          <div className="glass w-56 rounded-2xl p-4 text-left shadow-glass-lg">
            <p className="font-display text-sm font-semibold text-[#0b0f1a]">
              {info.label}
            </p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--lux-blue)]">
              Common Problems
            </p>
            <ul className="mt-1 text-xs text-[#0b0f1a]/70">
              {info.problems.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--emerald)]">
              Treatment Options
            </p>
            <ul className="mt-1 text-xs text-[#0b0f1a]/70">
              {info.treatments.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
        </Html>
      )}
    </group>
  );
}

function SkeletonModel() {
  const group = useRef<THREE.Group>(null);
  const [active, setActive] = useState<JointKey | null>(null);

  useFrame((_, delta) => {
    if (group.current && !active) {
      group.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={group} position={[0, 0.2, 0]}>
      {/* Head (decorative, non-interactive) */}
      <mesh position={[0, 3.0, 0]} castShadow>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshPhysicalMaterial color="#eef2f8" metalness={0.1} roughness={0.4} clearcoat={0.7} />
      </mesh>

      {/* Ribcage hint */}
      <mesh position={[0, 1.9, 0]}>
        <capsuleGeometry args={[0.32, 0.5, 8, 16]} />
        <meshPhysicalMaterial
          color="#eef2f8"
          transparent
          opacity={0.55}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      {/* Pelvis hint */}
      <mesh position={[0, 0.85, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.28, 0.15, 8, 16]} />
        <meshPhysicalMaterial color="#eef2f8" metalness={0.1} roughness={0.4} />
      </mesh>

      {BONES.map(([from, to], i) => (
        <Bone key={i} from={from as [number, number, number]} to={JOINT_POSITIONS[to]} />
      ))}

      {(Object.keys(JOINT_POSITIONS) as JointKey[]).map((key) => (
        <JointNode
          key={key}
          jointKey={key}
          position={JOINT_POSITIONS[key]}
          active={active}
          onHover={setActive}
        />
      ))}
    </group>
  );
}

export default function SkeletonScene() {
  // Shadow maps + ContactShadows + a high device-pixel-ratio are the most
  // expensive parts of this scene, and mobile GPUs (especially mid-range
  // Android phones) struggle with them. Detect small/touch screens once on
  // mount and render a lighter version there — same model, same
  // interactivity, just without the costly shadow passes.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    setIsMobile(mq.matches);
  }, []);

  return (
    <Canvas
      shadows={!isMobile}
      camera={{ position: [0, 1, 5.2], fov: 40 }}
      dpr={isMobile ? 1 : [1, 1.75]}
      gl={{ antialias: !isMobile, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} castShadow={!isMobile} />
      <pointLight position={[-3, 1, 2]} intensity={0.6} color="#0057D9" />
      <pointLight position={[3, -1, -2]} intensity={0.5} color="#D4AF37" />

      <Suspense fallback={null}>
        <SkeletonModel />
        {!isMobile && (
          <ContactShadows position={[0, -1.85, 0]} opacity={0.35} scale={6} blur={2.4} far={2} />
        )}
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
