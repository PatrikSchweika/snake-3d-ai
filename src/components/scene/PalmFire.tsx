import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, PointLight } from 'three'

const flameOffsets = [
  [-0.12, 0, 0.08, 0.22],
  [0.14, 0.02, -0.1, 0.26],
  [0.04, 0.05, 0.16, 0.18],
  [-0.18, -0.01, -0.04, 0.2],
] as const

export function PalmFire() {
  const flameRefs = useRef<Array<Group | null>>([])
  const lightRef = useRef<PointLight | null>(null)

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()

    flameRefs.current.forEach((flame, index) => {
      if (!flame) {
        return
      }

      const pulse = 0.9 + Math.sin(elapsed * 7 + index * 1.7) * 0.14
      flame.scale.setScalar(pulse)
      flame.position.y = 0.02 + Math.sin(elapsed * 5.5 + index) * 0.04
      flame.rotation.z = Math.sin(elapsed * 4.2 + index) * 0.08
    })

    if (lightRef.current) {
      lightRef.current.intensity = 4.8 + Math.sin(elapsed * 9.4) * 0.9
      lightRef.current.distance = 5.8 + Math.sin(elapsed * 6.3) * 0.4
    }
  })

  return (
    <group position={[0, 3.28, 0]}>
      {flameOffsets.map(([x, y, z, scale], index) => (
        <group
          key={`${x}-${z}-${index}`}
          position={[x, y, z]}
          ref={(node) => {
            flameRefs.current[index] = node
          }}
          scale={scale}
        >
          <mesh rotation={[0.05, 0, 0]}>
            <sphereGeometry args={[0.34, 10, 10]} />
            <meshBasicMaterial color={0xffc56f} transparent opacity={0.28} />
          </mesh>
          <mesh position={[0, 0.34, 0]} rotation={[0, 0, 0.08]}>
            <coneGeometry args={[0.22, 0.9, 5]} />
            <meshBasicMaterial color={0xff9a2f} transparent opacity={0.72} />
          </mesh>
          <mesh position={[0, 0.28, 0.02]} rotation={[0, 0, -0.05]}>
            <coneGeometry args={[0.12, 0.56, 5]} />
            <meshBasicMaterial color={0xffe6a3} transparent opacity={0.78} />
          </mesh>
        </group>
      ))}

      <pointLight
        ref={lightRef}
        args={[0xff8a24, 4.8, 5.8, 2]}
        castShadow={false}
        position={[0, 0.42, 0]}
      />
    </group>
  )
}
