import { useEffect, useMemo } from 'react'
import { createArenaTexture } from '../../game/proceduralTextures'
import { BOARD_SIZE } from '../../game/constants'
import { PalmTree } from './PalmTree'
import { Wall } from './Wall'

const pylonPositions = [
  [-BOARD_SIZE / 2 - 0.35, 0.7, -BOARD_SIZE / 2 - 0.35],
  [BOARD_SIZE / 2 + 0.35, 0.7, -BOARD_SIZE / 2 - 0.35],
  [-BOARD_SIZE / 2 - 0.35, 0.7, BOARD_SIZE / 2 + 0.35],
  [BOARD_SIZE / 2 + 0.35, 0.7, BOARD_SIZE / 2 + 0.35],
] as const

const palmPlacements = [
  [-8.7, 0, -6.8, 1.05, 0.2],
  [-9.2, 0, -1.4, 0.92, -0.3],
  [-8.8, 0, 4.2, 1.12, 0.45],
  [8.8, 0, -6.3, 1.08, -0.2],
  [9.25, 0, -0.6, 0.96, 0.35],
  [8.9, 0, 5.1, 1.16, -0.42],
  [-4.7, 0, -8.8, 0.98, 0.1],
  [1.5, 0, -9.1, 1.08, -0.25],
  [6.5, 0, -8.6, 0.9, 0.28],
  [-5.8, 0, 8.8, 1.03, -0.18],
  [0.8, 0, 9.15, 1.14, 0.31],
  [6.2, 0, 8.75, 0.94, -0.22],
] as const

export function Board() {
  const texture = useMemo(() => createArenaTexture(), [])

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <group>
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[BOARD_SIZE + 2.4, 0.68, BOARD_SIZE + 2.4]} />
        <meshStandardMaterial color={0x8f633d} metalness={0.02} roughness={0.96} />
      </mesh>

      <mesh position={[0, -0.18, 0]} receiveShadow>
        <boxGeometry args={[BOARD_SIZE, 0.28, BOARD_SIZE]} />
        <meshStandardMaterial
          color={0xc38b57}
          map={texture}
          metalness={0.04}
          roughness={0.92}
        />
      </mesh>

      <Wall
        position={[0, 0.1, -BOARD_SIZE / 2 - 0.25]}
        size={[BOARD_SIZE + 1.6, 1.2, 0.5]}
      />
      <Wall
        position={[0, 0.1, BOARD_SIZE / 2 + 0.25]}
        size={[BOARD_SIZE + 1.6, 1.2, 0.5]}
      />
      <Wall
        position={[-BOARD_SIZE / 2 - 0.25, 0.1, 0]}
        size={[0.5, 1.2, BOARD_SIZE + 1.6]}
      />
      <Wall
        position={[BOARD_SIZE / 2 + 0.25, 0.1, 0]}
        size={[0.5, 1.2, BOARD_SIZE + 1.6]}
      />

      {pylonPositions.map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x, y, z]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.32, 2.4, 18]} />
            <meshStandardMaterial
              color={0x8c6543}
              emissive={0x3a2516}
              metalness={0.08}
              roughness={0.78}
            />
          </mesh>
          <pointLight args={[0xffbe73, 4.2, 5]} position={[0, 1.1, 0]} />
        </group>
      ))}

      {palmPlacements.map(([x, y, z, scale, rotationY]) => (
        <PalmTree
          key={`${x}-${z}`}
          position={[x, y, z]}
          rotationY={rotationY}
          scale={scale}
        />
      ))}
    </group>
  )
}
