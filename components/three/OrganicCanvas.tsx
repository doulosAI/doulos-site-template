"use client"

import { useRef, MutableRefObject } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function OrganicScene({ progress }: { progress: MutableRefObject<number> }) {
  const r0 = useRef<THREE.Mesh>(null!)
  const r1 = useRef<THREE.Mesh>(null!)
  const r2 = useRef<THREE.Mesh>(null!)
  const r3 = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    const p = progress.current
    r0.current.rotation.x = p * Math.PI * 1.4
    r0.current.rotation.z = p * Math.PI * 0.9
    r1.current.rotation.y = -p * Math.PI * 1.1
    r1.current.rotation.z = p * Math.PI * 0.7
    r2.current.rotation.x = -p * Math.PI * 0.8
    r2.current.rotation.y = p * Math.PI * 1.2
    r3.current.rotation.x = p * Math.PI * 2.2
    r3.current.rotation.y = p * Math.PI * 1.8
  })

  return (
    <group>
      <mesh ref={r0}>
        <torusGeometry args={[1.6, 0.016, 6, 80]} />
        <meshBasicMaterial color="#d97706" transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={r1} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.25, 0.013, 6, 64]} />
        <meshBasicMaterial color="#d97706" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[0.9, 0.011, 6, 50]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={r3}>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshBasicMaterial color="#d97706" wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

export default function OrganicCanvas({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
      <OrganicScene progress={progress} />
    </Canvas>
  )
}
