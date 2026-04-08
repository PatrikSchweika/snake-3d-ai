import { startTransition, useCallback, useEffect, useRef, useState } from 'react'
import { createSynth } from '../game/audio'
import { stepGame, createInitialGameState } from '../game/engine'
import { clampSpeed, isOppositeDirection } from '../game/helpers'
import { readBestScore, saveBestScore } from '../game/storage'
import type { Direction, GameState } from '../game/types'

export function useSnakeGame() {
  const [state, setState] = useState<GameState>(() => createInitialGameState(readBestScore()))
  const stateRef = useRef(state)
  const accumulatorRef = useRef(0)
  const queuedDirectionRef = useRef<Direction | null>(null)
  const synthRef = useRef(createSynth())

  const commitState = useCallback((nextState: GameState) => {
    stateRef.current = nextState
    startTransition(() => {
      setState(nextState)
    })
  }, [])

  const resetGame = useCallback(() => {
    synthRef.current.primeMusic()
    accumulatorRef.current = 0
    queuedDirectionRef.current = null
    commitState(createInitialGameState(stateRef.current.bestScore))
  }, [commitState])

  const togglePause = useCallback(() => {
    synthRef.current.primeMusic()
    const current = stateRef.current

    if (current.phase === 'playing') {
      commitState({ ...current, phase: 'paused' })
      return
    }

    if (current.phase === 'paused') {
      commitState({ ...current, phase: 'playing' })
    }
  }, [commitState])

  const queueDirection = useCallback(
    (nextDirection: Direction) => {
      synthRef.current.primeMusic()
      const current = stateRef.current

      if (current.phase === 'gameover') {
        return
      }

      if (current.phase !== 'playing') {
        commitState({ ...current, phase: 'playing' })
      }

      const referenceDirection = queuedDirectionRef.current ?? current.direction

      if (!isOppositeDirection(nextDirection, referenceDirection)) {
        queuedDirectionRef.current = nextDirection
      }
    },
    [commitState],
  )

  const advance = useCallback(
    (delta: number) => {
      const current = stateRef.current

      if (current.phase !== 'playing') {
        return
      }

      accumulatorRef.current += Math.min(delta, 0.1)

      let nextState = current
      let ateFood = false
      let failed = false
      let changed = false

      while (
        accumulatorRef.current >= clampSpeed(nextState.score) &&
        nextState.phase === 'playing'
      ) {
        accumulatorRef.current -= clampSpeed(nextState.score)
        const result = stepGame(nextState, queuedDirectionRef.current)
        queuedDirectionRef.current = null
        nextState = result.state
        ateFood = ateFood || result.ateFood
        failed = failed || result.failed
        changed = true
      }

      if (!changed) {
        return
      }

      if (nextState.bestScore !== current.bestScore) {
        saveBestScore(nextState.bestScore)
      }

      if (ateFood) {
        synthRef.current.eat()
      }

      if (failed) {
        synthRef.current.fail()
      }

      commitState(nextState)
    },
    [commitState],
  )

  useEffect(() => {
    synthRef.current.setSceneState(state.phase)
  }, [state.phase])

  useEffect(
    () => () => {
      synthRef.current.dispose()
    },
    [],
  )

  return {
    advance,
    queueDirection,
    resetGame,
    state,
    togglePause,
  }
}
