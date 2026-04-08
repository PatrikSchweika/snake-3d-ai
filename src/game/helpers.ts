import { BOARD_SIZE, MIN_SPEED, SPEED_STEP, START_SPEED } from './constants'
import type { Cell, Direction, GamePhase } from './types'

export const toWorld = (value: number) => value - BOARD_SIZE / 2 + 0.5

export const clampSpeed = (score: number) =>
  Math.max(MIN_SPEED, START_SPEED - score * SPEED_STEP)

export const speedLevelFromScore = (score: number) =>
  Math.round((START_SPEED - clampSpeed(score)) / SPEED_STEP) + 1

export const sameCell = (left: Cell, right: Cell) => left.x === right.x && left.z === right.z

export const isOppositeDirection = (next: Direction, current: Direction) =>
  next.x === -current.x && next.z === -current.z

export const randomFood = (snake: Cell[]) => {
  const freeCells: Cell[] = []

  for (let x = 0; x < BOARD_SIZE; x += 1) {
    for (let z = 0; z < BOARD_SIZE; z += 1) {
      const cell = { x, z }
      if (!snake.some((segment) => sameCell(segment, cell))) {
        freeCells.push(cell)
      }
    }
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)] ?? { x: 0, z: 0 }
}

export const statusCopy: Record<GamePhase, string> = {
  ready: 'Press any arrow key or WASD to begin.',
  playing: 'Collect brush turkeys and stay inside the arena.',
  paused: 'Paused. Press Space to continue.',
  gameover: 'Crash detected. Press R to reset the run.',
}
