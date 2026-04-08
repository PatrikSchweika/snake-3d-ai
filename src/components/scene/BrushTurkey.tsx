import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { toWorld } from '../../game/helpers'
import type { Cell } from '../../game/types'

type BrushTurkeyProps = {
  cell: Cell
}

export function BrushTurkey({ cell }: BrushTurkeyProps) {
  const groupRef = useRef<Group | null>(null)
  const neckRef = useRef<Group | null>(null)

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) {
      return
    }

    const elapsed = clock.getElapsedTime()
    groupRef.current.position.set(
      toWorld(cell.x),
      0.38 + Math.sin(elapsed * 3.2) * 0.08,
      toWorld(cell.z),
    )
    groupRef.current.rotation.y += delta * 0.9

    if (neckRef.current) {
      neckRef.current.rotation.z = Math.sin(elapsed * 4.4) * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow position={[0, 0.24, 0]}>
        <sphereGeometry args={[0.3, 18, 18]} />
        <meshStandardMaterial color={0x3d2414} emissive={0x211207} roughness={0.92} />
      </mesh>

      <mesh castShadow position={[0, 0.28, -0.22]} rotation={[0.1, 0, 0]}>
        <sphereGeometry args={[0.24, 18, 18]} />
        <meshStandardMaterial color={0x4d311d} emissive={0x28160c} roughness={0.88} />
      </mesh>

      <group position={[0, 0.15, -0.12]}>
        {[-0.22, -0.08, 0.08, 0.22].map((x, index) => (
          <mesh
            key={`${x}-${index}`}
            castShadow
            position={[x, 0.18 + Math.abs(x) * 0.1, -0.2 - Math.abs(x) * 0.18]}
            rotation={[-0.45, x * 0.35, 0]}
          >
            <coneGeometry args={[0.08, 0.42, 5]} />
            <meshStandardMaterial color={0x59331f} emissive={0x241109} roughness={0.9} />
          </mesh>
        ))}
      </group>

      <group ref={neckRef} position={[0.05, 0.45, 0.1]}>
        <mesh castShadow position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.045, 0.06, 0.26, 10]} />
          <meshStandardMaterial color={0x6f4d20} emissive={0x2e1d0b} roughness={0.84} />
        </mesh>
        <mesh castShadow position={[0.02, 0.32, 0.02]}>
          <sphereGeometry args={[0.09, 14, 14]} />
          <meshStandardMaterial color={0xc13f21} emissive={0x551406} roughness={0.72} />
        </mesh>
        <mesh castShadow position={[0.07, 0.31, 0.11]} rotation={[0.05, 0, -0.2]}>
          <coneGeometry args={[0.025, 0.12, 8]} />
          <meshStandardMaterial color={0xf0cb7e} emissive={0x5d3d0c} roughness={0.48} />
        </mesh>
        <mesh position={[-0.02, 0.34, 0.08]}>
          <sphereGeometry args={[0.012, 10, 10]} />
          <meshStandardMaterial color={0x140f0c} emissive={0x140f0c} />
        </mesh>
      </group>

      {[-0.09, 0.09].map((x) => (
        <group key={x} position={[x, 0.02, 0.04]}>
          <mesh castShadow position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.018, 0.022, 0.18, 8]} />
            <meshStandardMaterial color={0xe0a23e} emissive={0x5d3807} roughness={0.62} />
          </mesh>
          <mesh position={[0, -0.01, 0.04]} rotation={[0.2, 0, 0]}>
            <coneGeometry args={[0.04, 0.08, 3]} />
            <meshStandardMaterial color={0xd8972d} emissive={0x583205} roughness={0.7} />
          </mesh>
        </group>
      ))}

      <pointLight args={[0xffb45d, 3.8, 4.5]} position={[0, 0.8, 0]} />
    </group>
  )
}
