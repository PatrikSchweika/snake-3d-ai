import { forwardRef } from 'react'
import type { Group } from 'three'

type SnakeVariant = 'head' | 'body' | 'tail'

type SnakeSegmentProps = {
  position: [number, number, number]
  rotationY: number
  variant: SnakeVariant
}

const segmentStyle: Record<
  SnakeVariant,
  { color: number; emissive: number; metalness: number; roughness: number }
> = {
  head: {
    color: 0x8a5a32,
    emissive: 0x31170c,
    metalness: 0.04,
    roughness: 0.72,
  },
  body: {
    color: 0x6f4323,
    emissive: 0x291309,
    metalness: 0.03,
    roughness: 0.82,
  },
  tail: {
    color: 0x5a341a,
    emissive: 0x241006,
    metalness: 0.03,
    roughness: 0.88,
  },
}

export const SnakeSegment = forwardRef<Group, SnakeSegmentProps>(
  function SnakeSegment({ position, rotationY, variant }, ref) {
    const style = segmentStyle[variant]

    return (
      <group ref={ref} position={position} rotation={[0, rotationY, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.84, 0.84, 0.84]} />
          <meshStandardMaterial
            color={style.color}
            emissive={style.emissive}
            metalness={style.metalness}
            roughness={style.roughness}
          />
        </mesh>

        {variant === 'head' ? (
          <>
            <mesh position={[-0.16, 0.11, 0.34]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color={0x120d09} emissive={0x120d09} />
            </mesh>
            <mesh position={[0.16, 0.11, 0.34]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color={0x120d09} emissive={0x120d09} />
            </mesh>
          </>
        ) : null}
      </group>
    )
  },
)
