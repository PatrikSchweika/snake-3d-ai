import { GameViewport } from './GameViewport'
import { Hud } from './Hud'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { useSnakeGame } from '../hooks/useSnakeGame'

export default function SnakeGame() {
  const { state, advance, queueDirection, resetGame, togglePause } = useSnakeGame()

  useKeyboardControls({
    onDirection: queueDirection,
    onReset: resetGame,
    onTogglePause: togglePause,
  })

  return (
    <section className="game-shell">
      <Hud state={state} />
      <GameViewport state={state} advance={advance} />
    </section>
  )
}
