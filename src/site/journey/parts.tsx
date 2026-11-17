import { useTexture } from '@react-three/drei'
import { useFrame, type ThreeElements } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { AdditiveBlending, CanvasTexture, Color, ExtrudeGeometry, InstancedMesh, Object3D, RepeatWrapping, Shape, ShapeGeometry, SRGBColorSpace, type Texture } from 'three'
import type { Photo } from '../OrganzaVeil'

// Shared pieces for the 3D journeys. Units are metres; y is up, the walk heads down -z.

export type V3 = [number, number, number]
export const GOLD = '#c9a15b'

// Mughal ogee arch, w wide and h tall, standing on y0.
export function archShape(w: number, h: number, y0 = 0) {
  const r = w / 2
  const spring = y0 + h - w * 0.62
  const top = y0 + h
  const s = new Shape()
  s.moveTo(-r, y0)
  s.lineTo(-r, spring)
  s.bezierCurveTo(-r, spring + w * 0.36, -w * 0.12, top - w * 0.16, 0, top)
  s.bezierCurveTo(w * 0.12, top - w * 0.16, r, spring + w * 0.36, r, spring)
  s.lineTo(r, y0)
  s.closePath()
  return s
}

// Flat arch with 0..1 UVs, for photographs.
export function archPlane(w: number, h: number) {
  const g = new ShapeGeometry(archShape(w, h), 32)
  const p = g.attributes.position
  const uv = g.attributes.uv
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, p.getY(i) / h)
  return g
}

// Moulding around an arch opening: b wide at the sides and top, `base` below.
export function archRing(w: number, h: number, b: number, depth: number, base = 0) {
  const o = archShape(w + 2 * b, h + b + base, -base)
  o.holes.push(archShape(w, h))
  return new ExtrudeGeometry(o, { depth, bevelEnabled: false, curveSegments: 32 })
}

// A W by H wall with an arch cut through it.
export function gateGeometry(W: number, H: number, w: number, h: number, depth: number) {
  const s = new Shape()
  s.moveTo(-W / 2, 0)
  s.lineTo(W / 2, 0)
  s.lineTo(W / 2, H)
  s.lineTo(-W / 2, H)
  s.closePath()
  s.holes.push(archShape(w, h))
  return new ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 32 })
}

// Procedural texture drawn on a canvas.
export function paint(w: number, h: number, draw: (c: CanvasRenderingContext2D) => void, repeat: [number, number] = [1, 1]) {
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  draw(cv.getContext('2d')!)
  const t = new CanvasTexture(cv)
  t.colorSpace = SRGBColorSpace
  t.wrapS = t.wrapT = RepeatWrapping
  t.repeat.set(...repeat)
  t.anisotropy = 8
  return t
}

let glowTex: CanvasTexture | null = null
const glow = () =>
  (glowTex ??= paint(128, 128, (c) => {
    const g = c.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.18, 'rgba(255,225,170,.55)')
    g.addColorStop(1, 'rgba(255,180,90,0)')
    c.fillStyle = g
    c.fillRect(0, 0, 128, 128)
  }))

// Soft additive halo, always facing the camera.
export function Glow({ size = 1, color = '#ffc56e', opacity = 1, ...props }: { size?: number; color?: string; opacity?: number } & ThreeElements['group']) {
  return (
    <group {...props}>
      <sprite scale={[size, size, 1]}>
        <spriteMaterial map={glow()} color={color} opacity={opacity} blending={AdditiveBlending} depthWrite={false} transparent toneMapped={false} />
      </sprite>
    </group>
  )
}

export function Lamp({ size = 1.6, ...props }: { size?: number } & ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 12]} />
        <meshBasicMaterial color="#fff1cf" toneMapped={false} />
      </mesh>
      <Glow size={size} />
    </group>
  )
}

export function GoldMaterial() {
  return <meshStandardMaterial color={GOLD} metalness={0.75} roughness={0.32} emissive="#3d2a0c" />
}

// Crop a texture like object-fit: cover, honouring the photo's focal point.
function cover(tex: Texture, aspect: number, pos: string) {
  const img = tex.image as { width: number; height: number }
  const ia = img.width / img.height
  const [px, py] = pos === 'center' ? [0.5, 0.5] : pos.split(' ').map((v) => parseFloat(v) / 100)
  tex.colorSpace = SRGBColorSpace
  if (ia > aspect) {
    tex.repeat.set(aspect / ia, 1)
    tex.offset.set((1 - aspect / ia) * px, 0)
  } else {
    tex.repeat.set(1, ia / aspect)
    tex.offset.set(0, (1 - ia / aspect) * (1 - py))
  }
}

// A photograph in an arched gold frame, standing on its base.
export function PhotoFrame({ photo, w = 1.5, h = 2.1, ...props }: { photo: Photo; w?: number; h?: number } & ThreeElements['group']) {
  const tex = useTexture(photo.small)
  useMemo(() => cover(tex, w / h, photo.pos), [tex, w, h, photo.pos])
  const geo = useMemo(() => archPlane(w, h), [w, h])
  const frame = useMemo(() => archRing(w, h, 0.08, 0.06, 0.08), [w, h])
  return (
    <group {...props}>
      <mesh geometry={geo} position-z={0.035}>
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <mesh geometry={frame}>
        <GoldMaterial />
      </mesh>
    </group>
  )
}

// Deterministic random, so scenes look the same on every visit.
export function rand(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
}

// Clay diyas with flickering flames, optionally bobbing on water.
export function Diyas({ at, bob = false }: { at: V3[]; bob?: boolean }) {
  const bowl = useRef<InstancedMesh>(null!)
  const flame = useRef<InstancedMesh>(null!)
  const m = useMemo(() => new Object3D(), [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    at.forEach(([x, y, z], i) => {
      const dy = bob ? Math.sin(t * 1.3 + i) * 0.03 : 0
      m.position.set(x, y + dy, z)
      m.scale.setScalar(1)
      m.updateMatrix()
      bowl.current.setMatrixAt(i, m.matrix)
      m.position.y += 0.08
      m.scale.set(1, 0.8 + Math.sin(t * 9 + i * 3.1) * 0.2, 1)
      m.updateMatrix()
      flame.current.setMatrixAt(i, m.matrix)
    })
    bowl.current.instanceMatrix.needsUpdate = true
    flame.current.instanceMatrix.needsUpdate = true
  })
  return (
    <>
      <instancedMesh ref={bowl} args={[undefined, undefined, at.length]} frustumCulled={false}>
        <cylinderGeometry args={[0.1, 0.055, 0.06, 12]} />
        <meshStandardMaterial color="#9a4420" roughness={0.8} emissive="#3a1206" />
      </instancedMesh>
      <instancedMesh ref={flame} args={[undefined, undefined, at.length]} frustumCulled={false}>
        <coneGeometry args={[0.028, 0.1, 8]} />
        <meshBasicMaterial color="#ffd27a" toneMapped={false} />
      </instancedMesh>
    </>
  )
}

// Many small spheres in one draw call, each with its own colour.
export function Beads({ at, colors, r = 0.08, basic = false }: { at: V3[]; colors: string[]; r?: number; basic?: boolean }) {
  const ref = useRef<InstancedMesh>(null!)
  useLayoutEffect(() => {
    const m = new Object3D()
    const c = new Color()
    at.forEach((p, i) => {
      m.position.set(...p)
      m.updateMatrix()
      ref.current.setMatrixAt(i, m.matrix)
      ref.current.setColorAt(i, c.set(colors[i % colors.length]))
    })
    ref.current.instanceMatrix.needsUpdate = true
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true
  }, [at, colors])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, at.length]} frustumCulled={false}>
      <sphereGeometry args={[r, 10, 8]} />
      {basic ? <meshBasicMaterial toneMapped={false} /> : <meshStandardMaterial roughness={0.6} />}
    </instancedMesh>
  )
}
