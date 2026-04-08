import { EAST, BOARD_SIZE, INITIAL_SNAKE } from './constants'
import { isOppositeDirection, randomFood, sameCell } from './helpers'
import type { Direction, GameState } from './types'

export type StepResult = {
  ateFood: boolean
  failed: boolean
  state: GameState
}

export const createInitialGameState = (bestScore: number): GameState => {
  const snake = INITIAL_SNAKE.map((segment) => ({ ...segment }))

  return {
    bestScore,
    direction: { ...EAST },
    food: randomFood(snake),
    phase: 'ready',
    score: 0,
    snake,
  }
}

export const stepGame = (
  state: GameState,
  queuedDirection: Direction | null,
): StepResult => {
  const direction =
    queuedDirection && !isOppositeDirection(queuedDirection, state.direction)
      ? queuedDirection
      : state.direction

  const nextHead = {
    x: state.snake[0].x + direction.x,
    z: state.snake[0].z + direction.z,
  }
  const ateFood = sameCell(nextHead, state.food)

  const hitWall =
    nextHead.x < 0 ||
    nextHead.z < 0 ||
    nextHead.x >= BOARD_SIZE ||
    nextHead.z >= BOARD_SIZE
  const collisionBody = ateFood ? state.snake : state.snake.slice(0, -1)
  const hitBody = collisionBody.some((segment) => sameCell(segment, nextHead))

  if (hitWall || hitBody) {
    return {
      ateFood: false,
      failed: true,
      state: { ...state, direction, phase: 'gameover' },
    }
  }

  const snake = [nextHead, ...state.snake]

  if (!ateFood) {
    snake.pop()
  }

  const score = ateFood ? state.score + 1 : state.score
  const bestScore = Math.max(state.bestScore, score)

  return {
    ateFood,
    failed: false,
    state: {
      ...state,
      bestScore,
      direction,
      food: ateFood ? randomFood(snake) : state.food,
      score,
      snake,
    },
  }
}
