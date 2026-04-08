import { STORAGE_KEY } from './constants'

export const readBestScore = () => {
  const storedBest = Number(window.localStorage.getItem(STORAGE_KEY) ?? 0)
  return Number.isFinite(storedBest) ? storedBest : 0
}

export const saveBestScore = (score: number) => {
  window.localStorage.setItem(STORAGE_KEY, String(score))
}
