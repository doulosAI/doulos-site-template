"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const COUNT = 500
const THRESHOLD_SQ = 2.5 * 2.5

function ParticleScene() {
  const groupRef = useRef<THREE.Group>(null!)

  const { ptGeo, lineGeo } = useMemo(() => {
    // Particle positions
    const pts = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pts[i * 3]     = (Math.random() - 0.5) * 14
      pts[i * 3 + 1] = (Math.random() - 0.5) * 9
      pts[i * 3 + 2] = (Math.random() - 0.5) * 5
    }

    // Connection lines (static — group rotation creates perceived movement)
    const lines: number[] = []
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pts[i*3] - pts[j*3]
        const dy = pts[i*3+1] - pts[j*3+1]
        const dz = pts[i*3+2] - pts[j*3+2]
        if (dx*dx + dy*dy + dz*dz < THRESHOLD_SQ) {
          lines.push(pts[i*3], pts[i*3+1], pts[i*3+2], pts[j*3], pts[j*3+1], pts[j*3+2])
        }
      }
    }

    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute("position", new THREE.BufferAttribute(pts, 3))

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lines), 3))

    return { ptGeo, lineGeo }
  }, [])

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime
    groupRef.current.rotation.y = t * 0.025
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.04, 0.03)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouse.x * 0.025, 0.03)
  })

  return (
    <group ref={groupRef}>
      <points geometry={ptGeo}>
        <pointsMaterial
          size={0.055} color="#d97706" transparent opacity={0.85}
          sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#d97706" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-[3] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} gl={{ alpha: true, antialias: false }} dpr={[1, 1.3]}>
        <ParticleScene />
      </Canvas>
    </div>
  )
}
