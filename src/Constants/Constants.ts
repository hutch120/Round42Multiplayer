/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from '../Providers/DimensionProvider'
import getShipSpawnLocation from '../Providers/PlayerSpawnLocationProvider'
import { angles } from './Angles'
import { CGAColors } from './CGAColors'

/**
 * Module:          All speeds for all objects
 * Responsibility:  Define constants at which speed an enemy moves.
 */

const { gameField, pixelSize } = dimensionProvider()

export const Locations = {
  // All locations were determined by drawing a grid over screenshot.
  robot: {
    topStart: gameField.top + pixelSize * 18,
    maxBottom: gameField.top + pixelSize * 65,
    scatteredMaxBottom: gameField.top + pixelSize * 45
  },
  Orb: {
    topStart: gameField.top + pixelSize * 18,
    maxTop: gameField.top + pixelSize * 5,
    maxBottom: gameField.top + pixelSize * 55
  },
  Piston: {
    topStart: gameField.top + pixelSize * 18
  },
  Devil: {
    maxBottom: gameField.top + pixelSize * 60
  },
  Crab: {
    topStart: gameField.top + pixelSize * 18
  },
  Player: {
    spawnLocation: getShipSpawnLocation()
  },
  Boat: {
    topStart: pixelSize * 18
  },
  CloakingOrb: {
    maxBottom: pixelSize * 55
  }
}

// Collective module for all movement angles.
export const MovementAngles = {
  bird: [2, 358, 178, 182],
  robot: 5,
  spinner: [2, 358, 178, 182],
  piston: 170,
  diabolo: [2, 358, 178, 182],
  diaboloHardLeftRight: [0, 180],
  diaboloHardUpDown: [90, 270],
  devil: [angles.leftdown, angles.rightdown]
}

// Collective module for all frametimes.
export const FrameTimes = {
  bird: 100,
  robot: 200,
  orb: 200,
  spinner: 100,
  balloon: 100,
  piston: 200,
  diabolo: 200,
  crab: 100,
  bat: 100,
  boat: 200,
  cloakingOrb: 150,
  fish: 150
}

// Colletive module for all ememy points. Enemy points are award per enemy. Doesn't matter which level they appear.
export const Points = {
  bird: 200,
  robot: 100,
  orb: 200,
  spinner: 200,
  balloon: 200,
  asteroid: 300,
  piston: 200,
  diabolo: 200,
  spaceMonster: 300,
  devil: 100,
  crab: 200,
  bat: 200,
  boat: 200,
  cloakingOrb: 100,
  fish: 100,
  warpLevel: [1300, 1400, 1500, 1600, 1700]
}

const heightPixelCount = 72
const height = heightPixelCount * pixelSize
const top = pixelSize * 8

export const WarpLevelConstants = {
  heightPixelCount,
  top,
  height,
  left: gameField.left + pixelSize,
  right: gameField.right - pixelSize * 2,
  bottom: top + height,
  width: pixelSize * 16.5
}

/**
 * Colors used by enemies. These are either picked randomly or picked at the beginning of a level.
 */
export const ColorSchemes = {
  Enemies: {
    robot: [
      CGAColors.lightBlue,
      CGAColors.lightCyan,
      CGAColors.lightRed,
      CGAColors.lightGreen,
      CGAColors.lightBlue,
      CGAColors.lightMagenta
    ],
    cloakingOrb: [
      CGAColors.lightBlue,
      CGAColors.lightCyan,
      CGAColors.lightRed,
      CGAColors.lightGreen,
      CGAColors.lightBlue,
      CGAColors.lightMagenta
    ],
    orb: [
      [CGAColors.lightGreen, CGAColors.lightBlue],
      [CGAColors.brown, CGAColors.lightGreen],
      [CGAColors.lightBlue, CGAColors.white],
      [CGAColors.white, CGAColors.brown]
    ]
  },
  Explosions: {
    spaceMonster: [CGAColors.yellow, CGAColors.lightGreen, CGAColors.lightBlue]
  },
  birds: [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed]
}
