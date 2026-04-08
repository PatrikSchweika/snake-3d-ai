import type { GamePhase } from './types'

type SynthController = {
  dispose: () => void
  eat: () => void
  fail: () => void
  primeMusic: () => void
  setSceneState: (phase: GamePhase) => void
}

const MUSIC_PATH = '/music/theme.mp3'

export const createSynth = (): SynthController => {
  let audioContext: AudioContext | null = null
  let masterGain: GainNode | null = null
  let effectsGain: GainNode | null = null
  let musicElement: HTMLAudioElement | null = null

  const ensureMusicElement = () => {
    if (typeof window === 'undefined') {
      return null
    }

    if (!musicElement) {
      musicElement = new Audio(MUSIC_PATH)
      musicElement.loop = true
      musicElement.preload = 'auto'
      musicElement.volume = 0.01
    }

    return musicElement
  }

  const ensureContext = () => {
    if (typeof window === 'undefined') {
      return null
    }

    if (!audioContext) {
      audioContext = new window.AudioContext()
    }

    if (!masterGain || !effectsGain) {
      masterGain = audioContext.createGain()
      masterGain.gain.value = 0.76
      masterGain.connect(audioContext.destination)

      effectsGain = audioContext.createGain()
      effectsGain.gain.value = 0.95
      effectsGain.connect(masterGain)
    }

    if (audioContext.state === 'suspended') {
      void audioContext.resume()
    }

    return audioContext
  }

  const playTone = (frequency: number, duration: number, type: OscillatorType, volume: number) => {
    const context = ensureContext()

    if (!context || !effectsGain) {
      return
    }

    const now = context.currentTime
    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, now)
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.85, now + duration)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    oscillator.connect(gain)
    gain.connect(effectsGain)
    oscillator.start(now)
    oscillator.stop(now + duration + 0.02)
  }

  const phaseVolume: Record<GamePhase, number> = {
    ready: 0.18,
    playing: 0.34,
    paused: 0.12,
    gameover: 0.08,
  }

  return {
    eat: () => {
      playTone(740, 0.12, 'triangle', 0.08)
      playTone(920, 0.08, 'sine', 0.05)
    },
    fail: () => {
      playTone(180, 0.35, 'sawtooth', 0.085)
    },
    primeMusic: () => {
      const element = ensureMusicElement()

      if (!element) {
        return
      }

      if (element.paused) {
        const playAttempt = element.play()
        if (playAttempt) {
          void playAttempt.catch(() => {})
        }
      }
    },
    setSceneState: (phase: GamePhase) => {
      const element = ensureMusicElement()

      if (!element) {
        return
      }

      element.volume = phaseVolume[phase]

      if (phase === 'playing' || phase === 'ready') {
        if (element.paused) {
          const playAttempt = element.play()
          if (playAttempt) {
            void playAttempt.catch(() => {})
          }
        }
        return
      }

      if (phase === 'paused') {
        return
      }

      if (phase === 'gameover' && element.paused) {
        const playAttempt = element.play()
        if (playAttempt) {
          void playAttempt.catch(() => {})
        }
      }
    },
    dispose: () => {
      if (musicElement) {
        musicElement.pause()
        musicElement.src = ''
        musicElement.load()
      }

      if (audioContext) {
        void audioContext.close()
      }

      musicElement = null
      audioContext = null
      masterGain = null
      effectsGain = null
    },
  }
}
