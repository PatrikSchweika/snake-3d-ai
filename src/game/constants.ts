import type { Cell, Direction } from './types'

export const BOARD_SIZE = 12
export const START_SPEED = 0.34
export const MIN_SPEED = 0.12
export const SPEED_STEP = 0.015
export const STORAGE_KEY = 'snake-3d-best-score'

export const INITIAL_SNAKE: Cell[] = [
  { x: 5, z: 6 },
  { x: 4, z: 6 },
  { x: 3, z: 6 },
]

export const NORTH: Direction = { x: 0, z: -1 }
export const SOUTH: Direction = { x: 0, z: 1 }
export const EAST: Direction = { x: 1, z: 0 }
export const WEST: Direction = { x: -1, z: 0 }
