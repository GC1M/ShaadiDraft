import { MeshReflectorMaterial, Sparkles, Stars } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { InstancedMesh, Object3D } from 'three'
import { SHOTS } from '../OrganzaVeil'
import Journey, { STOPS, photoSide, type Place } from './Journey'
import { Beads, Diyas, GoldMaterial, Glow, Lamp, PhotoFrame, type V3 } from './parts'

// Garden at night: a Mughal char bagh with a water channel down the middle, cypress rows, marigold toranas
// over the path, strings of lights and fireflies, ending at a marble pavilion.

const STEP = 10
const N = STOPS.length
const END = -(N + 1) * STEP
const START = 10
const zStop = (i: number) => -(i + 1) * STEP
const photoAt = (i: number) => ({ x: photoSide(i) * 2.7, z: zStop(i) - 4.2 })

const places = (narrow: boolean): Place[] => [
  { cam: [0, 1.7, 8], look: [0, 2, -20] },
  ...STOPS.map((_, i): Place => {
    const { x, z } = photoAt(i)
    return narrow ? { cam: [0, 1.7, zStop(i)], look: [x, 1.25, z] } : { cam: [0, 1.7, zStop(i)], look: [x * 0.5, 1.8, z] }
  }),
  { cam: [0, 1.9, END + 5], look: [0, 2.8, END - 6] },
]

const MARIGOLD = ['#f39a1d', '#ffc531', '#f39a1d', '#e8730c', '#ffc531', '#b3202e']

// Marigold toranas: a curved crossbar of flowers with strands hanging from it, highest at the ends.
const TORANA_Z = [...STOPS.map((_, i) => zStop(i) + 2.5), END + 1.2]
const FLOWERS: V3[] = (() => {
  const out: V3[] = []
  for (const z of TORANA_Z) {
    for (let k = 0; k <= 40; k++) {
      const x = -2.6 + (k / 40) * 5.2
      out.push([x, 3.9 + Math.cos((x / 2.6) * (Math.PI / 2)) * 0.35, z])
    }
    for (let s = 0; s <= 12; s++) {
      const x = -2.4 + (s / 12) * 4.8
      const len = 4 + Math.round(Math.abs(x) * 2.5)
      for (let k = 1; k <= len; k++) out.push([x, 3.9 + Math.cos((x / 2.6) * (Math.PI / 2)) * 0.35 - k * 0.17, z])
    }
    for (const x of [-2.6, 2.6]) for (let k = 0; k < 22; k++) out.push([x, k * 0.18, z]) // flowers wound up the posts
  }
  return out
})()

// Cypress rows on both sides of the walk.
const CYPRESS: V3[] = (() => {
  const out: V3[] = []
  for (let z = START - 2; z > END - 4; z -= 3) for (const x of [-4.6, 4.6, -7.6, 7.6]) out.push([x, 0, z - (Math.abs(x) > 5 ? 1.5 : 0)])
  return out
})()

// Fairy lights sagging between the inner cypresses.
const BULBS: V3[] = (() => {
  const out: V3[] = []
  for (let z = START - 2; z > END; z -= 3)
    for (const x of [-4.6, 4.6])
      for (let k = 0; k < 14; k++) {
        const t = k / 14
        out.push([x, 3.4 - Math.sin(t * Math.PI) * 0.6, z - t * 3])
      }
  return out
})()

function Cypresses() {
  const ref = useRef<InstancedMesh>(null!)
  useLayoutEffect(() => {
    const m = new Object3D()
    CYPRESS.forEach(([x, , z], i) => {
      const h = 4.6 + ((i * 37) % 10) / 8
      m.position.set(x, h / 2, z)
      m.scale.set(1, h / 5, 1)
      m.updateMatrix()
      ref.current.setMatrixAt(i, m.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, CYPRESS.length]} frustumCulled={false}>
      <coneGeometry args={[0.6, 5, 10]} />
      <meshStandardMaterial color="#18301f" roughness={1} />
    </instancedMesh>
  )
}

function Pavilion({ z }: { z: number }) {
  const pillars = useMemo(() => {
    const out: [number, number][] = []
    for (const x of [-3.6, -1.2, 1.2, 3.6]) for (const pz of [-2.6, 2.6]) out.push([x, pz])
    return out
  }, [])
  return (
    <group position={[0, 0, z]}>
      <mesh position-y={0.3}>
        <boxGeometry args={[9.4, 0.6, 7]} />
        <meshStandardMaterial color="#e6ddd0" roughness={0.5} />
      </mesh>
      {pillars.map(([x, pz]) => (
        <mesh key={`${x}${pz}`} position={[x, 2.2, pz]}>
          <cylinderGeometry args={[0.17, 0.2, 3.2, 16]} />
          <meshStandardMaterial color="#f1ebe1" roughness={0.45} />
        </mesh>
      ))}
      <mesh position-y={4}>
        <boxGeometry args={[9.8, 0.45, 7.4]} />
        <meshStandardMaterial color="#e6ddd0" roughness={0.5} />
      </mesh>
      <mesh position-y={4.22}>
        <sphereGeometry args={[2.2, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f3ede4" roughness={0.4} />
      </mesh>
      <mesh position-y={6.7}>
        <coneGeometry args={[0.18, 1, 10]} />
        <GoldMaterial />
      </mesh>
      <Lamp position={[0, 3.2, 0]} size={3} />
      <pointLight position={[0, 2.6, 0]} color="#ffbf70" intensity={40} distance={14} decay={2} />
      <Diyas at={Array.from({ length: 18 }, (_, k): V3 => [-4.25 + k * 0.5, 0.62, 3.3])} />
    </group>
  )
}

function Garden() {
  const narrow = useThree((s) => s.size.width < 768)
  const L = START - END + 20
  const mid = (START + END - 20) / 2
  const channel = useMemo(() => Array.from({ length: Math.floor((START - END) / 1.6) }, (_, k): V3 => [(k % 2 ? 0.25 : -0.25), 0.02, START - 2 - k * 1.6]), [])
  return (
    <>
      <fog attach="fog" args={['#0b1210', 8, 46]} />
      <ambientLight intensity={0.22} color="#9fb4ff" />
      <directionalLight position={[-30, 40, -60]} color="#b8c6ff" intensity={0.5} />
      <Stars radius={160} depth={40} count={narrow ? 1500 : 3000} factor={4} fade speed={0.4} />
      <group position={[-34, 38, END - 70]}>
        <mesh>
          <sphereGeometry args={[3, 32, 16]} />
          <meshBasicMaterial color="#f4f0e2" fog={false} toneMapped={false} />
        </mesh>
        <Glow size={26} color="#cfd8ff" opacity={0.5} />
      </group>

      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, mid]}>
        <planeGeometry args={[60, L]} />
        <meshStandardMaterial color="#0f1d14" roughness={1} />
      </mesh>
      {[-1, 1].map((x) => (
        <mesh key={x} rotation-x={-Math.PI / 2} position={[x * 1.75, 0.01, mid]}>
          <planeGeometry args={[2.3, L]} />
          <meshStandardMaterial color="#6e5d4c" roughness={0.9} />
        </mesh>
      ))}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, mid]}>
        <planeGeometry args={[1.2, L]} />
        {narrow ? (
          <meshStandardMaterial color="#14202a" roughness={0.1} metalness={0.8} />
        ) : (
          <MeshReflectorMaterial color="#2a3542" blur={[120, 40]} resolution={512} mixBlur={0.6} mixStrength={5} mirror={0.9} roughness={0.8} metalness={0.5} />
        )}
      </mesh>
      {[-1, 1].map((x) => (
        <mesh key={x} position={[x * 0.66, 0.06, mid]}>
          <boxGeometry args={[0.12, 0.12, L]} />
          <meshStandardMaterial color="#cdbb9f" roughness={0.8} />
        </mesh>
      ))}
      <Diyas at={channel} bob />

      <Cypresses />
      <Beads at={BULBS} colors={['#ffe3a3']} r={0.035} basic />
      <Beads at={FLOWERS} colors={MARIGOLD} r={0.085} />
      {TORANA_Z.map((z) => (
        <group key={z} position-z={z}>
          {[-2.6, 2.6].map((x) => (
            <group key={x}>
              <mesh position={[x, 2, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 4, 10]} />
                <GoldMaterial />
              </mesh>
              <Lamp position={[x * 0.92, 3.1, 0.1]} size={1.4} />
            </group>
          ))}
          <pointLight position={[0, 3.2, 1]} color="#ffb35c" intensity={18} distance={9} decay={2} />
        </group>
      ))}

      {STOPS.map((s, i) => {
        const { x, z } = photoAt(i)
        return (
          <group key={s.title} position={[x, 0, z]} rotation-y={-photoSide(i) * 0.5}>
            <mesh position-y={0.4}>
              <boxGeometry args={[1.9, 0.8, 0.6]} />
              <meshStandardMaterial color="#d8cbb6" roughness={0.6} />
            </mesh>
            <PhotoFrame photo={s.photo} position-y={0.86} />
            <pointLight position={[0, 2, 1.2]} color="#ffcf8a" intensity={6} distance={5} decay={2} />
          </group>
        )
      })}

      <Pavilion z={END - 6} />
      <Sparkles count={narrow ? 70 : 160} scale={[12, 3.2, START - END]} position={[0, 1.6, (START + END) / 2]} size={3.2} speed={0.35} color="#d9f28c" opacity={0.85} />
    </>
  )
}

export default function GardenNight() {
  return (
    <Journey
      title="Ananya and Arjun: a garden at night"
      intro="Scroll to walk the garden. Each torana holds a part of our story."
      labels={['Gate', 'Pavilion']}
      finale={{ kicker: 'The Leela Palace gardens, Udaipur', title: 'See you under the lights' }}
      places={places}
      bg="#0b1210"
      rsvp={SHOTS.lakePalace}
      blessings={SHOTS.marigold}
    >
      <Garden />
    </Journey>
  )
}
