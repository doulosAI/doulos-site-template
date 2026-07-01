"use client"

import { useRef, useMemo, MutableRefObject } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const COUNT = 350
const THRESHOLD_SQ = 2.5 * 2.5

function ParticleScene({ progress }: { progress: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!)

  const { ptGeo, lineGeo } = useMemo(() => {
    const pts = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pts[i * 3]     = (Math.random() - 0.5) * 12
      pts[i * 3 + 1] = (Math.random() - 0.5) * 7
      pts[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    const lines: number[] = []
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pts[i*3] - pts[j*3], dy = pts[i*3+1] - pts[j*3+1], dz = pts[i*3+2] - pts[j*3+2]
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

  useFrame(() => {
    const p = progress.current
    groupRef.current.rotation.y = p * Math.PI * 1.2
    groupRef.current.rotation.x = (p - 0.5) * 0.5
  })

  return (
    <group ref={groupRef}>
      <points geometry={ptGeo}>
        <pointsMaterial size={0.05} color="#d97706" transparent opacity={0.85}
          sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#d97706" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

export default function ParticleField({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 55 }} gl={{ alpha: true, antialias: false }} dpr={[1, 1.3]}>
      <ParticleScene progress={progress} />
    </Canvas>
  )
}
