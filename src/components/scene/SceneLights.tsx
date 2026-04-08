export function SceneLights() {
  const accentLights = [
    [9.5, 1.6, 0, 0xf8b868],
    [0, 1.6, 9.5, 0x6ca66b],
    [-9.5, 1.6, 0, 0xf8b868],
    [0, 1.6, -9.5, 0x6ca66b],
  ] as const

  return (
    <>
      <hemisphereLight args={[0xffe1b0, 0x513625, 1.35]} />
      <directionalLight
        castShadow
        intensity={1.65}
        position={[10, 16, 6]}
        shadow-camera-bottom={-12}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <pointLight args={[0xffb05b, 26, 30, 2]} position={[-7, 4, -6]} />
      <pointLight args={[0x7bb063, 18, 28, 2]} position={[6, 3, 7]} />
      {accentLights.map(([x, y, z, color], index) => (
        <pointLight
          key={`${x}-${z}-${index}`}
          args={[color, 2.4, 8, 2]}
          position={[x, y, z]}
        />
      ))}
    </>
  )
}
