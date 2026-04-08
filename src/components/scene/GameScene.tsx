import { useFrame } from '@react-three/fiber'
import { Board } from './Board'
import { BrushTurkey } from './BrushTurkey'
import { CameraRig } from './CameraRig'
import { SceneLights } from './SceneLights'
import { Snake } from './Snake'
import { Starfield } from './Starfield'
import type { GameState } from '../../game/types'

type GameSceneProps = {
  state: GameState
  advance: (delta: number) => void
}

export function GameScene({ state, advance }: GameSceneProps) {
  useFrame((_, delta) => {
    advance(delta)
  })

  return (
    <>
      <fog attach="fog" args={[0x9f7a4e, 20, 38]} />
      <SceneLights />
      <CameraRig head={state.snake[0]} />
      <Starfield />
      <Board />
      <BrushTurkey cell={state.food} />
      <Snake direction={state.direction} snake={state.snake} />
    </>
  )
}
