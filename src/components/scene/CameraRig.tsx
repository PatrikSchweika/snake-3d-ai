import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { BOARD_SIZE } from '../../game/constants'
import type { Cell } from '../../game/types'

type CameraRigProps = {
  head: Cell
}

const toWorld = (value: number) => value - BOARD_SIZE / 2 + 0.5

export function CameraRig({ head }: CameraRigProps) {
  const { camera } = useThree()
  const cameraRef = useRef(camera)

  useEffect(() => {
    cameraRef.current = camera
  }, [camera])

  useFrame(() => {
    const activeCamera = cameraRef.current
    const targetX = toWorld(head.x) * 0.24
    const targetZ = toWorld(head.z) * 0.18
    activeCamera.position.x = THREE.MathUtils.lerp(activeCamera.position.x, targetX, 0.035)
    activeCamera.position.z = THREE.MathUtils.lerp(activeCamera.position.z, 13 + targetZ, 0.035)
    activeCamera.lookAt(0, 0.2, 0)
  })

  return null
}
