import CoastLine from './Coastline'
import Pins from './Pins'
import React from 'react'

const EarthComponent = ({ radius }: { radius: number }) => {
  return (
    <>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color="#ccc" />
        <CoastLine radius={radius} />
        <Pins radius={radius} />
      </mesh>
    </>
  )
}

export const Earth = React.memo(EarthComponent, () => true)
