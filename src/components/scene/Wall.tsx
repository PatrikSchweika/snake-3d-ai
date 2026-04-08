type WallProps = {
  position: [number, number, number]
  size: [number, number, number]
}

export function Wall({ position, size }: WallProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={0x7c5a3e}
        emissive={0x342114}
        metalness={0.05}
        roughness={0.82}
      />
    </mesh>
  )
}
