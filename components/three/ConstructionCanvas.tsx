"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const SHAPES = [
  { pos: [0, 0, 0] as [number,number,number],     scale: 1.8, rx: 0.25, ry: 0.40 },
  { pos: [3.2, 1.2, -2] as [number,number,number], scale: 0.9, rx: 0.40, ry: 0.55 },
  { pos: [-3, -1, -1.5] as [number,number,number], scale: 0.7, rx: 0.30, ry: 0.35 },
  { pos: [1.5, -2.2, -3] as [number,number,number],scale: 0.5, rx: 0.55, ry: 0.20 },
  { pos: [-2.2, 2, -2.5] as [number,number,number],scale: 0.45, rx: 0.45, ry: 0.60 },
  { pos: [0.5, 3, -2] as [number,number,number],   scale: 0.35, rx: 0.20, ry: 0.50 },
]

function WireFrame({ pos, scale, rx, ry }: typeof SHAPES[0]) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.rotation.x = t * rx
    ref.current.rotation.y = t * ry
  })
  return (
    <mesh ref={ref} position={pos} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#d97706" wireframe transparent opacity={0.35} />
    </mesh>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null!)
  useFrame(({ mouse }) => {
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.06, 0.04)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.08, 0.04)
  })
  return (
    <group ref={groupRef}>
      {SHAPES.map((s, i) => <WireFrame key={i} {...s} />)}
    </group>
  )
}

export default function ConstructionCanvas() {
  return (
    <div className="absolute inset-0 z-[3] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
    </div>
  )
}
