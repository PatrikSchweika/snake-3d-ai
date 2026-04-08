import { useEffect, useEffectEvent } from 'react'
import { EAST, NORTH, SOUTH, WEST } from '../game/constants'
import type { Direction } from '../game/types'

type KeyboardControls = {
  onDirection: (direction: Direction) => void
  onReset: () => void
  onTogglePause: () => void
}

export function useKeyboardControls({
  onDirection,
  onReset,
  onTogglePause,
}: KeyboardControls) {
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    switch (event.key.toLowerCase()) {
      case 'arrowup':
      case 'w':
        event.preventDefault()
        onDirection(NORTH)
        break
      case 'arrowdown':
      case 's':
        event.preventDefault()
        onDirection(SOUTH)
        break
      case 'arrowleft':
      case 'a':
        event.preventDefault()
        onDirection(WEST)
        break
      case 'arrowright':
      case 'd':
        event.preventDefault()
        onDirection(EAST)
        break
      case ' ':
        event.preventDefault()
        onTogglePause()
        break
      case 'r':
        event.preventDefault()
        onReset()
        break
      default:
        break
    }
  })

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      onKeyDown(event)
    }

    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])
}
