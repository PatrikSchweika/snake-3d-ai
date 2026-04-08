import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { toWorld } from '../../game/helpers'
import type { Cell, Direction } from '../../game/types'
import { SnakeSegment } from './SnakeSegment'

type SnakeProps = {
  direction: Direction
  snake: Cell[]
}

export function Snake({ direction, snake }: SnakeProps) {
  const segmentRefs = useRef<Array<Group | null>>([])

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()

    segmentRefs.current.forEach((segment, index) => {
      if (!segment) {
        return
      }

      segment.position.y = 0.48 + Math.sin(elapsed * 6 - index * 0.28) * 0.035
    })
  })

  return (
    <group>
      {snake.map((segment, index) => {
        const lookDirection =
          index === 0
            ? direction
            : {
                x: snake[index - 1].x - segment.x,
                z: snake[index - 1].z - segment.z,
              }

        const variant =
          index === 0 ? 'head' : index === snake.length - 1 ? 'tail' : 'body'

        return (
          <SnakeSegment
            key={`${segment.x}-${segment.z}-${index}`}
            ref={(node) => {
              segmentRefs.current[index] = node
            }}
            position={[toWorld(segment.x), 0.48, toWorld(segment.z)]}
            rotationY={Math.atan2(lookDirection.x, lookDirection.z)}
            variant={variant}
          />
        )
      })}
    </group>
  )
}
