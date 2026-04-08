import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { BufferGeometry, Points } from 'three'

const createStarPositions = () => {
  const starCount = 180
  const values = new Float32Array(starCount * 3)

  for (let index = 0; index < starCount; index += 1) {
    values[index * 3] = (Math.random() - 0.5) * 42
    values[index * 3 + 1] = 8 + Math.random() * 10
    values[index * 3 + 2] = (Math.random() - 0.5) * 42
  }

  return values
}

const starPositions = createStarPositions()

export function Starfield() {
  const ref = useRef<Points<BufferGeometry> | null>(null)

  useFrame((_, delta) => {
    if (!ref.current) {
      return
    }

    ref.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          args={[starPositions, 3]}
          attach="attributes-position"
          count={starPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={0xdaf7ff} opacity={0.75} size={0.065} transparent />
    </points>
  )
}
