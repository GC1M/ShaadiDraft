import { MeshReflectorMaterial, Sparkles, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import { SHOTS } from '../OrganzaVeil'
import Journey, { STOPS, photoSide, type Place } from './Journey'
import { GoldMaterial, Lamp, PhotoFrame, archRing, gateGeometry, paint } from './parts'

// Palace walk: down a lamp-lit gallery of Mughal arches over a chequered marble floor, out to a window on the lake.

const SP = 9 // metres between stops
const W = 8
const H = 7
const N = STOPS.length
const END = -(N + 1) * SP // the lake window
const START = 8
const L = START - END
const zStop = (i: number) => -(i + 1) * SP
const photoAt = (i: number) => ({ x: photoSide(i) * 1.9, z: zStop(i) - 4.6 })

const places = (narrow: boolean): Place[] => [
  { cam: [0, 1.7, 6], look: [0, 2.3, -12] },
  ...STOPS.map((_, i): Place => {
    const { x, z } = photoAt(i)
    return narrow ? { cam: [0, 1.7, zStop(i) - 0.8], look: [x, 1.2, z] } : { cam: [-photoSide(i) * 0.35, 1.7, zStop(i) + 0.4], look: [x * 0.58, 1.8, z] }
  }),
  { cam: [0, 1.9, END + 3.2], look: [0, 2.6, END - 12] },
]

const GATE = gateGeometry(W, H, 3.4, 5.2, 0.7)
const TRIM = archRing(3.4, 5.2, 0.2, 0.08)
const TRIM_OUT = archRing(3.95, 5.5, 0.06, 0.08)

function Gate({ z, jaali, lit = true }: { z: number; jaali: ReturnType<typeof paint>; lit?: boolean }) {
  return (
    <group position-z={z}>
      <mesh geometry={GATE} position-z={-0.35}>
        <meshStandardMaterial color="#4b3539" roughness={0.85} />
      </mesh>
      <mesh geometry={TRIM} position-z={0.35}>
        <GoldMaterial />
      </mesh>
      <mesh geometry={TRIM_OUT} position-z={0.35}>
        <GoldMaterial />
      </mesh>
      {[-1, 1].map((x) => (
        <group key={x}>
          <mesh position={[x * 2.9, 5.7, 0.4]}>
            <torusGeometry args={[0.34, 0.035, 8, 40]} />
            <GoldMaterial />
          </mesh>
          <mesh position={[x * 2.9, 5.7, 0.4]}>
            <circleGeometry args={[0.09, 20]} />
            <GoldMaterial />
          </mesh>
          <mesh position={[x * 2.85, 1.55, 0.36]}>
            <planeGeometry args={[1.5, 2.6]} />
            <meshStandardMaterial map={jaali} roughness={0.6} />
          </mesh>
          <Lamp position={[x * 2.4, 3.5, 0.7]} />
        </group>
      ))}
      <mesh position={[0, 6.55, 0.38]}>
        <boxGeometry args={[W, 0.08, 0.05]} />
        <GoldMaterial />
      </mesh>
      {lit && <pointLight position={[0, 4.6, -1.8]} color="#ffb35c" intensity={36} distance={15} decay={2} />}
    </group>
  )
}

function Palace() {
  const narrow = useThree((s) => s.size.width < 768)
  const lake = useTexture(SHOTS.lakeBoats.src)
  lake.colorSpace = 'srgb'
  const tex = useMemo(
    () => ({
      floor: paint(
        256,
        256,
        (c) => {
          c.fillStyle = '#cdbca4'
          c.fillRect(0, 0, 256, 256)
          c.fillStyle = '#1b1215'
          c.fillRect(0, 0, 128, 128)
          c.fillRect(128, 128, 128, 128)
          c.strokeStyle = 'rgba(201,161,91,.55)'
          c.lineWidth = 2
          c.strokeRect(1, 1, 254, 254)
          c.strokeRect(1, 1, 127, 127)
        },
        [W / 1.6, L / 1.6],
      ),
      carpet: paint(
        256,
        8,
        (c) => {
          c.fillStyle = '#6b1626'
          c.fillRect(0, 0, 256, 8)
          c.fillStyle = '#c9a15b'
          ;[0, 14, 238, 252].forEach((x) => c.fillRect(x, 0, 4, 8))
          c.fillStyle = '#4d0f1b'
          ;[4, 242].forEach((x) => c.fillRect(x, 0, 10, 8))
        },
        [1, L],
      ),
      wall: paint(
        512,
        1024,
        (c) => {
          c.fillStyle = '#2b1e23'
          c.fillRect(0, 0, 512, 1024)
          c.fillStyle = '#c9a15b'
          c.globalAlpha = 0.35
          c.fillRect(0, 0, 14, 1024)
          c.fillRect(498, 0, 14, 1024)
          c.fillRect(0, 150, 512, 6)
          c.globalAlpha = 1
          const arch = (w: number, top: number) => {
            c.beginPath()
            c.moveTo(256 - w, 1024)
            c.lineTo(256 - w, top + w * 1.2)
            c.bezierCurveTo(256 - w, top + w * 0.5, 256 - w * 0.25, top + w * 0.3, 256, top)
            c.bezierCurveTo(256 + w * 0.25, top + w * 0.3, 256 + w, top + w * 0.5, 256 + w, top + w * 1.2)
            c.lineTo(256 + w, 1024)
          }
          arch(150, 300)
          c.fillStyle = '#160e12'
          c.fill()
          c.strokeStyle = 'rgba(201,161,91,.7)'
          c.lineWidth = 5
          c.stroke()
          arch(120, 350)
          c.strokeStyle = 'rgba(201,161,91,.3)'
          c.lineWidth = 2
          c.stroke()
        },
        [L / 3.5, 1],
      ),
      ceiling: paint(
        128,
        128,
        (c) => {
          c.fillStyle = '#140d10'
          c.fillRect(0, 0, 128, 128)
          c.fillStyle = 'rgba(201,161,91,.5)'
          c.beginPath()
          c.arc(64, 64, 3, 0, Math.PI * 2)
          c.fill()
        },
        [W / 1.2, L / 1.2],
      ),
      jaali: paint(128, 128, (c) => {
        c.fillStyle = '#1a1215'
        c.fillRect(0, 0, 128, 128)
        c.strokeStyle = 'rgba(201,161,91,.65)'
        c.lineWidth = 3
        for (let i = -128; i <= 256; i += 32) {
          c.beginPath()
          c.moveTo(i, 0)
          c.lineTo(i + 128, 128)
          c.moveTo(i + 128, 0)
          c.lineTo(i, 128)
          c.stroke()
        }
      }, [2, 3.4]),
    }),
    [],
  )
  const mid = (START + END) / 2

  return (
    <>
      <fog attach="fog" args={['#140d10', 5, 36]} />
      <ambientLight intensity={0.35} color="#ffd9b0" />

      <mesh rotation-x={-Math.PI / 2} position={[0, 0, mid]}>
        <planeGeometry args={[W, L]} />
        {narrow ? (
          <meshStandardMaterial map={tex.floor} roughness={0.35} metalness={0.1} />
        ) : (
          <MeshReflectorMaterial map={tex.floor} blur={[400, 120]} resolution={1024} mixBlur={1} mixStrength={2.2} mirror={0.6} roughness={0.55} metalness={0.15} depthScale={0.4} minDepthThreshold={0.4} maxDepthThreshold={1.4} />
        )}
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.006, mid]}>
        <planeGeometry args={[2.4, L]} />
        <meshStandardMaterial map={tex.carpet} roughness={0.95} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, H, mid]}>
        <planeGeometry args={[W, L]} />
        <meshStandardMaterial map={tex.ceiling} roughness={1} />
      </mesh>
      {[-1, 1].map((x) => (
        <mesh key={x} rotation-y={-x * (Math.PI / 2)} position={[(x * W) / 2, H / 2, mid]}>
          <planeGeometry args={[L, H]} />
          <meshStandardMaterial map={tex.wall} roughness={0.9} />
        </mesh>
      ))}

      <Gate z={1.5} jaali={tex.jaali} />
      {STOPS.map((s, i) => {
        const { x, z } = photoAt(i)
        return (
          <group key={s.title}>
            <Gate z={zStop(i) + 1.6} jaali={tex.jaali} />
            <group position={[x, 0, z]} rotation-y={-photoSide(i) * 0.28}>
              <mesh position-y={0.42}>
                <boxGeometry args={[1.9, 0.84, 0.6]} />
                <meshStandardMaterial color="#3b2a2f" roughness={0.7} />
              </mesh>
              <mesh position-y={0.86}>
                <boxGeometry args={[1.96, 0.04, 0.66]} />
                <GoldMaterial />
              </mesh>
              <PhotoFrame photo={s.photo} position-y={0.96} />
            </group>
          </group>
        )
      })}
      <Gate z={END} jaali={tex.jaali} lit={false} />
      <pointLight position={[0, 4, END + 2]} color="#ffb35c" intensity={24} distance={10} decay={2} />
      {/* What you see through the last arch. */}
      <mesh position={[0, 5, END - 34]}>
        <planeGeometry args={[78, 52]} />
        <meshBasicMaterial map={lake} fog={false} toneMapped={false} />
      </mesh>

      <Sparkles count={narrow ? 80 : 180} scale={[W - 1, H - 1, L]} position={[0, H / 2, mid]} size={2.2} speed={0.25} color="#e8c27a" opacity={0.55} />
    </>
  )
}

export default function PalaceWalk() {
  return (
    <Journey
      title="Ananya and Arjun: a walk through the palace"
      intro="Scroll to walk in. Each room holds a part of our story."
      labels={['Gate', 'The lake']}
      finale={{ kicker: 'The Leela Palace, Lake Pichola', title: 'See you by the lake' }}
      places={places}
      bg="#140d10"
      rsvp={SHOTS.lakePalace}
      blessings={SHOTS.courtyard}
    >
      <Palace />
    </Journey>
  )
}
