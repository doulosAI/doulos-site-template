"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function OrganicScene() {
  const r0 = useRef<THREE.Mesh>(null!)
  const r1 = useRef<THREE.Mesh>(null!)
  const r2 = useRef<THREE.Mesh>(null!)
  const r3 = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime
    r0.current.rotation.x = t * 0.22
    r0.current.rotation.z = t * 0.15
    r1.current.rotation.y = -t * 0.18
    r1.current.rotation.z = t * 0.12
    r2.current.rotation.x = -t * 0.14
    r2.current.rotation.y = t * 0.20
    r3.current.rotation.x = t * 0.35
    r3.current.rotation.y = t * 0.28
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.08, 0.03)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.05, 0.03)
  })

  return (
    <group ref={groupRef}>
      {/* Large outer ring */}
      <mesh ref={r0}>
        <torusGeometry args={[1.8, 0.018, 6, 80]} />
        <meshBasicMaterial color="#d97706" transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Mid ring, tilted */}
      <mesh ref={r1} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.4, 0.014, 6, 64]} />
        <meshBasicMaterial color="#d97706" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Inner ring, different tilt */}
      <mesh ref={r2} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[1.0, 0.012, 6, 50]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Core wireframe */}
      <mesh ref={r3}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color="#d97706" wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

export default function OrganicCanvas() {
  return (
    <div className="absolute inset-0 z-[3] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
        <OrganicScene />
      </Canvas>
    </div>
  )
}
