import { speedLevelFromScore, statusCopy } from '../game/helpers'
import type { GameState } from '../game/types'

type HudProps = {
  state: GameState
}

export function Hud({ state }: HudProps) {
  return (
    <div className="copy-panel">
      <p className="eyebrow">Bushland Run</p>
      <h1>Snake 3D</h1>
      <p className="intro">
        Slip through a warm Australian-inspired arena as a brown snake, scoop up brush
        turkeys, and weave between palms. Steer with arrow keys or WASD, pause with
        Space, and restart with R.
      </p>

      <div className="stats-grid">
        <article>
          <span>Turkeys</span>
          <strong>{state.score}</strong>
        </article>
        <article>
          <span>Best</span>
          <strong>{state.bestScore}</strong>
        </article>
        <article>
          <span>Speed</span>
          <strong>Lv. {speedLevelFromScore(state.score)}</strong>
        </article>
      </div>

      <p className="status-chip" data-phase={state.phase}>
        {statusCopy[state.phase]}
      </p>

      <div className="controls-list">
        <span>WASD / Arrows</span>
        <span>Move</span>
        <span>Space</span>
        <span>Pause</span>
        <span>R</span>
        <span>Reset</span>
      </div>
    </div>
  )
}
