import { MeshReflectorMaterial, Sky } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { InstancedMesh, Object3D } from 'three'
import { SHOTS } from '../OrganzaVeil'
import Journey, { STOPS, photoSide, type Place } from './Journey'
import { Diyas, GoldMaterial, Glow, PhotoFrame, archPlane, rand, type V3 } from './parts'

// Lake ride: a boat at golden hour across Lake Pichola, past stone platforms with a photograph on each,
// through a field of floating diyas, to a palace on the water.

const STEP = 14
const N = STOPS.length
const END = -(N + 1) * STEP
const PALACE_Z = END - 62
const lane = (i: number) => Math.sin(i * 1.2) * 2.2 // the boat weaves a little
const platformAt = (i: number) => ({ x: lane(i) + photoSide(i) * 3.4, z: -(i + 1) * STEP - 6 })

const places = (narrow: boolean): Place[] => [
  { cam: [0, 1.7, 9], look: [0, 3, -60] },
  ...STOPS.map((_, i): Place => {
    const x = lane(i)
    const z = -(i + 1) * STEP
    const p = platformAt(i)
    return { cam: [x, 1.3, z], look: narrow ? [p.x, 1.2, p.z] : [x + photoSide(i) * 1.8, 1.7, p.z] }
  }),
  { cam: [0, 1.4, END + 2], look: [0, 6, PALACE_Z] },
]

// Diyas floating along the route, ringed around each platform, and lining the ghat steps.
const DIYAS: V3[] = (() => {
  const r = rand(7)
  const out: V3[] = []
  for (let i = 0; i < 220; i++) {
    const z = 5 - r() * (5 - END + 10)
    const x = (r() - 0.5) * 22
    if (Math.abs(x - Math.sin((-z / STEP - 1) * 1.2) * 2.2) > 1.6) out.push([x, 0.02, z]) // keep the boat's lane clear
  }
  STOPS.forEach((_, i) => {
    const { x, z } = platformAt(i)
    for (let k = 0; k < 10; k++) out.push([x + Math.cos((k / 10) * Math.PI * 2) * 1.55, 0.55, z + Math.sin((k / 10) * Math.PI * 2) * 1.55])
  })
  for (let k = 0; k < 24; k++) out.push([-11.5 + k, 0.7, 7.65]) // along the second step
  return out
})()

const WINDOW = archPlane(0.7, 1.1)

const HILLS = (() => {
  const r = rand(3)
  return Array.from({ length: 16 }, (_, i) => ({ x: -170 + i * 22 + r() * 10, h: 10 + r() * 16, w: 26 + r() * 22, z: PALACE_Z - 50 - r() * 40 }))
})()

// A terraced white palace on the water with lit windows.
const BLOCKS: [number, number, number, number, number][] = [
  // w, h, d, x, y (bottom)
  [52, 4, 12, 0, 0],
  [40, 5, 10, 0, 4],
  [22, 5, 8, 0, 9],
  [9, 4, 7, 0, 14],
  [7, 6, 7, -21, 4],
  [7, 6, 7, 21, 4],
]
const DOMES: [number, number, number][] = [
  [0, 18, 3.2],
  [-8, 14, 1.6],
  [8, 14, 1.6],
  [-21, 10, 2.4],
  [21, 10, 2.4],
  [-15, 9, 1.1],
  [15, 9, 1.1],
]

function LakePalace() {
  const windows = useRef<InstancedMesh>(null!)
  const spots = useMemo(() => {
    const out: V3[] = []
    for (const [w, h, d, x, y] of BLOCKS)
      for (let row = 0; row < Math.floor(h / 2.2); row++)
        for (let col = 0; col < Math.floor(w / 2.4); col++) out.push([x - w / 2 + 1.2 + col * 2.4, y + 0.6 + row * 2.2, d / 2 + 0.02])
    return out
  }, [])
  useLayoutEffect(() => {
    const m = new Object3D()
    spots.forEach((p, i) => {
      m.position.set(...p)
      m.updateMatrix()
      windows.current.setMatrixAt(i, m.matrix)
    })
    windows.current.instanceMatrix.needsUpdate = true
  }, [spots])
  return (
    <group position={[0, 0, PALACE_Z]}>
      {BLOCKS.map(([w, h, d, x, y], i) => (
        <mesh key={i} position={[x, y + h / 2, 0]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#eadfcd" roughness={0.9} />
        </mesh>
      ))}
      {DOMES.map(([x, y, r], i) => (
        <group key={i} position={[x, y, 0]}>
          <mesh>
            <sphereGeometry args={[r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#efe6d6" roughness={0.7} />
          </mesh>
          <mesh position-y={r + 0.4}>
            <coneGeometry args={[r * 0.12, 0.9, 8]} />
            <GoldMaterial />
          </mesh>
        </group>
      ))}
      <instancedMesh ref={windows} args={[WINDOW, undefined, spots.length]} frustumCulled={false}>
        <meshBasicMaterial color="#ffc978" toneMapped={false} />
      </instancedMesh>
      <Glow size={70} color="#ffb070" opacity={0.25} position={[0, 10, 4]} />
    </group>
  )
}

function Lake() {
  const narrow = useThree((s) => s.size.width < 768)
  const mid = (12 + PALACE_Z) / 2
  return (
    <>
      <Sky distance={4500} sunPosition={[-0.35, 0.04, -1]} turbidity={9} rayleigh={2.4} mieCoefficient={0.006} mieDirectionalG={0.92} />
      <fog attach="fog" args={['#d9946e', 50, 260]} />
      <hemisphereLight args={['#ffd2a6', '#2a2030', 0.9]} />
      <directionalLight position={[-120, 18, -300]} color="#ffae6b" intensity={2.4} />
      {/* Evening light on the palace front, from the boat's side. */}
      <directionalLight position={[40, 30, 120]} color="#ffcf9e" intensity={1.1} />

      <mesh rotation-x={-Math.PI / 2} position={[0, 0, mid]}>
        <planeGeometry args={[600, 400]} />
        {narrow ? (
          <meshStandardMaterial color="#3a3f52" roughness={0.25} metalness={0.6} />
        ) : (
          <MeshReflectorMaterial color="#4a4c60" blur={[300, 60]} resolution={1024} mixBlur={0.8} mixStrength={6} mirror={0.85} roughness={0.9} metalness={0.4} depthScale={0.6} minDepthThreshold={0.2} maxDepthThreshold={1.6} />
        )}
      </mesh>

      {/* The ghat you set off from. */}
      {[0, 1, 2, 3].map((k) => (
        <mesh key={k} position={[0, (1 - k * 0.3) / 2, 8.6 - k * 0.7]}>
          <boxGeometry args={[26, 1 - k * 0.3, 0.7]} />
          <meshStandardMaterial color="#c9b79c" roughness={0.9} />
        </mesh>
      ))}

      {STOPS.map((s, i) => {
        const { x, z } = platformAt(i)
        const face = Math.atan2(lane(i) - x, -(i + 1) * STEP - z)
        return (
          <group key={s.title} position={[x, 0, z]}>
            <mesh position-y={0.18}>
              <cylinderGeometry args={[1.8, 1.95, 0.5, 40]} />
              <meshStandardMaterial color="#cdbb9f" roughness={0.85} />
            </mesh>
            <mesh position-y={0.5}>
              <cylinderGeometry args={[1.35, 1.45, 0.2, 40]} />
              <meshStandardMaterial color="#ddcdb2" roughness={0.8} />
            </mesh>
            <PhotoFrame photo={s.photo} position-y={0.62} rotation-y={face} />
            <pointLight position={[0, 1.6, 1.4]} color="#ffb35c" intensity={8} distance={6} decay={2} />
          </group>
        )
      })}

      <Diyas at={DIYAS} bob />
      <LakePalace />
      {HILLS.map((h, i) => (
        <mesh key={i} position={[h.x, -2, h.z]} scale={[h.w, h.h, h.w * 0.5]}>
          <sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#4a3846" roughness={1} />
        </mesh>
      ))}
    </>
  )
}

export default function LakeRide() {
  return (
    <Journey
      title="Ananya and Arjun: a boat across the lake"
      intro="Scroll to row out. Each stop holds a part of our story."
      labels={['Ghat', 'The palace']}
      finale={{ kicker: 'The Leela Palace, Lake Pichola', title: 'See you by the lake' }}
      places={places}
      bg="#d9946e"
      bob
      rsvp={SHOTS.lakePalace}
      blessings={SHOTS.marigold}
    >
      <Lake />
    </Journey>
  )
}
