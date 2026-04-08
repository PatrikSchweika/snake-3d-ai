import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { GameScene } from './scene/GameScene'
import type { GameState } from '../game/types'

type GameViewportProps = {
  state: GameState
  advance: (delta: number) => void
}

export function GameViewport({ state, advance }: GameViewportProps) {
  return (
    <div className="viewport-panel">
      <div className="canvas-frame">
        <Canvas
          camera={{ fov: 48, near: 0.1, far: 100, position: [0, 14, 13] }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          shadows
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
            gl.shadowMap.enabled = true
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }}
        >
          <GameScene state={state} advance={advance} />
        </Canvas>
      </div>
      <div className="corner-glow corner-glow-left" />
      <div className="corner-glow corner-glow-right" />
    </div>
  )
}
