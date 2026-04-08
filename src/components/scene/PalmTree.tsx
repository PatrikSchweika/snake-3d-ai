type PalmTreeProps = {
  position: [number, number, number]
  scale?: number
  rotationY?: number
}

const frondRotations = [
  [0.15, 0, -0.2],
  [0.2, Math.PI / 3, 0.1],
  [0.12, (Math.PI * 2) / 3, -0.05],
  [0.18, Math.PI, 0.16],
  [0.14, (Math.PI * 4) / 3, -0.1],
  [0.2, (Math.PI * 5) / 3, 0.12],
] as const

export function PalmTree({ position, scale = 1, rotationY = 0 }: PalmTreeProps) {
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <mesh castShadow position={[0, 1.55, 0]} rotation={[0.08, 0, -0.05]}>
        <cylinderGeometry args={[0.16, 0.24, 3.2, 8]} />
        <meshStandardMaterial color={0x7b5230} emissive={0x2f1b10} roughness={0.94} />
      </mesh>

      <mesh castShadow position={[0.02, 3.16, 0]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color={0x6e4828} emissive={0x2e1a0d} roughness={0.92} />
      </mesh>

      {frondRotations.map(([x, y, z], index) => (
        <mesh
          key={`${y}-${index}`}
          castShadow
          position={[0.02, 3.18, 0]}
          rotation={[x, y, z]}
        >
          <coneGeometry args={[0.18, 1.75, 4]} />
          <meshStandardMaterial color={0x2f7c42} emissive={0x14351c} roughness={0.88} />
        </mesh>
      ))}
    </group>
  )
}
