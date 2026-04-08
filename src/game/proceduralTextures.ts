import * as THREE from 'three'

const paintNoise = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  alpha: number,
) => {
  const image = context.createImageData(width, height)

  for (let index = 0; index < image.data.length; index += 4) {
    const shade = 146 + Math.random() * 42
    image.data[index] = shade
    image.data[index + 1] = shade - 28
    image.data[index + 2] = shade - 64
    image.data[index + 3] = alpha
  }

  context.putImageData(image, 0, 0)
}

export const createArenaTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024

  const context = canvas.getContext('2d')

  if (!context) {
    return new THREE.CanvasTexture(canvas)
  }

  const gradient = context.createLinearGradient(0, 0, 1024, 1024)
  gradient.addColorStop(0, '#d59b63')
  gradient.addColorStop(0.5, '#c0824e')
  gradient.addColorStop(1, '#8e5f36')
  context.fillStyle = gradient
  context.fillRect(0, 0, 1024, 1024)

  paintNoise(context, 1024, 1024, 46)

  context.globalCompositeOperation = 'screen'
  const glow = context.createRadialGradient(512, 512, 90, 512, 512, 500)
  glow.addColorStop(0, 'rgba(255, 230, 170, 0.36)')
  glow.addColorStop(0.5, 'rgba(238, 176, 92, 0.24)')
  glow.addColorStop(1, 'rgba(96, 60, 28, 0)')
  context.fillStyle = glow
  context.fillRect(0, 0, 1024, 1024)

  context.globalCompositeOperation = 'source-over'
  context.strokeStyle = 'rgba(135, 89, 47, 0.28)'
  context.lineWidth = 4

  const step = 1024 / 12
  for (let offset = 0; offset <= 1024; offset += step) {
    context.beginPath()
    context.moveTo(offset, 0)
    context.lineTo(offset, 1024)
    context.stroke()

    context.beginPath()
    context.moveTo(0, offset)
    context.lineTo(1024, offset)
    context.stroke()
  }

  context.strokeStyle = 'rgba(104, 69, 38, 0.4)'
  context.lineWidth = 6
  context.strokeRect(18, 18, 988, 988)

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}
