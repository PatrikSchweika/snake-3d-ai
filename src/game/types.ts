export type Cell = {
  x: number
  z: number
}

export type Direction = {
  x: number
  z: number
}

export type GamePhase = 'ready' | 'playing' | 'paused' | 'gameover'

export type GameState = {
  bestScore: number
  direction: Direction
  food: Cell
  phase: GamePhase
  score: number
  snake: Cell[]
}
