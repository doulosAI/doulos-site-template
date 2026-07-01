"use client"

import { useRef, MutableRefObject } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const SHAPES = [
  { pos: [0, 0, 0] as [number,number,number],     scale: 1.6, rx: 0.6,  ry: 1.1 },
  { pos: [3.0, 1.0, -2] as [number,number,number], scale: 0.85, rx: 1.0, ry: 1.5 },
  { pos: [-2.8, -0.9, -1.5] as [number,number,number], scale: 0.65, rx: 0.8, ry: 0.9 },
  { pos: [1.4, -2.0, -3] as [number,number,number],scale: 0.5, rx: 1.4, ry: 0.5 },
]

function WireFrame({ pos, scale, rx, ry, progress }:
  typeof SHAPES[0] & { progress: MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    const p = progress.current
    ref.current.rotation.x = p * Math.PI * 2 * rx
    ref.current.rotation.y = p * Math.PI * 2 * ry
  })
  return (
    <mesh ref={ref} position={pos} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#d97706" wireframe transparent opacity={0.4} />
    </mesh>
  )
}

function Scene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <group>
      {SHAPES.map((s, i) => <WireFrame key={i} {...s} progress={progress} />)}
    </group>
  )
}

export default function ConstructionCanvas({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
      <Scene progress={progress} />
    </Canvas>
  )
}
