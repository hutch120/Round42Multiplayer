/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from '../Providers/DimensionProvider'
import { calculateAngle } from '../Utility/Geometry'
import { calculateDistance, getLocation } from '../Utility/Location'

/**
 * Module:          GetPhaserFrames
 * Responsibility:  Calculate the game locations to draw a phaser beam.
 */

const { pixelSize } = dimensionProvider()

export default function getPhaserLocations(
  sourceLeft: number,
  sourceTop: number,
  targetLeft: number,
  targetTop: number
): Array<{ left: number; top: number }> {
  // offset left by one game pixel to ensure the phaser appears at the nozzle of the ship.
  const angle = calculateAngle(sourceLeft, sourceTop, targetLeft, targetTop)
  let distance = calculateDistance(sourceLeft, sourceTop, targetLeft, targetTop)

  let left = sourceLeft
  let top = sourceTop

  const returnValue: Array<{ left: number; top: number }> = []

  // Stop when the distance is one pixel size so the phaser ends just within the enemy.
  while (distance >= 0) {
    returnValue.push(getLocation(left, top, angle, pixelSize))
    distance -= pixelSize
    const nextLocation = getLocation(left, top, angle, pixelSize)
    left = nextLocation.left
    top = nextLocation.top
  }

  return returnValue
}
